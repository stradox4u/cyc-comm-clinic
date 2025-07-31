// soapnote.service.ts

import type { Vitals, Prisma } from "@prisma/client";
import { EventType } from "@prisma/client";
import prisma from "../../config/prisma.js";
import type { SoapNoteRecord } from "./soapnote.validation.js";
import { 
  SoapNoteRecordSchema,
  subjectiveSchema,
  objectiveSchema,
} from "./soapnote.validation.js";
import { ProviderRoleTitle } from "@prisma/client";
import { UserType } from "../../types/index.js";

export type SoapNoteCreateInput = Prisma.SoapNoteCreateInput;

function deepClone<T>(obj: T): T {
  return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
}

async function createSoapNote(
  payload: unknown,
  createdById: string
) {
  const parsed = SoapNoteRecordSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error('Invalid soap note payload');
  }

  const soapNote = parsed.data;

  if (!soapNote.appointment_id) {
    throw new Error('Missing appointment_id on soap note');
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: soapNote.appointment_id },
    select: {
      purposes: true,
      vitals: true,
    }
  });

  if (!appointment) throw new Error('Linked appointment not found');

  const purposeResult = subjectiveSchema.shape.purpose_of_appointment?.safeParse
    ? subjectiveSchema.shape.purpose_of_appointment.safeParse(appointment.purposes)
    : { success: true, data: appointment.purposes };

  if (!purposeResult.success) throw new Error('Invalid purpose_of_appointment from appointment');

  if (!appointment.vitals) {
    throw new Error("Vitals not found on linked appointment");
  }

  const vitalsWithEvents = appointment.vitals as Vitals & { events: EventType[] };
  
  const vitalsData = {
    ...appointment.vitals,
    events: vitalsWithEvents.events ?? [],
    created_by_id: appointment.vitals.created_by_id ?? createdById,
    appointment_id: soapNote.appointment_id,
  };
  
  const vitalsResult = objectiveSchema.shape.vitals_summary.safeParse(vitalsData);
  
  if (!vitalsResult.success) throw new Error("Invalid vitals_summary from appointment");
  
  soapNote.objective = { ...soapNote.objective, vitals_summary: vitalsResult.data };
  soapNote.subjective = { ...soapNote.subjective, purpose_of_appointment: purposeResult.data };
  soapNote.assessment = soapNote.assessment ?? {};
  soapNote.plan = { ...soapNote.plan, prescription: soapNote.plan?.prescription ?? [] };

  const serialized: Pick<SoapNoteCreateInput, 'subjective' | 'objective' | 'assessment' | 'plan'> = {
    subjective: deepClone(soapNote.subjective),
    objective: deepClone(soapNote.objective),
    assessment: deepClone(soapNote.assessment),
    plan: deepClone(soapNote.plan),
  };

  const SoapNoteToCreate: Prisma.SoapNoteCreateInput = {
    ...soapNote,
    ...serialized,
    appointment: {
      connect: { id: soapNote.appointment_id }
    },
    events: {
      create: [
        {
          type: EventType.SOAP_NOTE_RECORDED,
          created_by_id: createdById,
          appointment_id: soapNote.appointment_id
        }
      ]
    }
  };

  return prisma.soapNote.create({ data: SoapNoteToCreate });
}

async function updateSoapNote(
  payload: unknown,
  createdById: string
): Promise<{ data: any }> {
  if (!payload) {
    throw new Error('No payload provided');
  }

  const parsed = SoapNoteRecordSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error('Invalid soap note payload');
  }
  const soapNote = parsed.data;

  const serialized: Pick<SoapNoteCreateInput, 'subjective' | 'objective' | 'assessment' | 'plan'> = {
    subjective: deepClone(soapNote.subjective),
    objective: deepClone(soapNote.objective),
    assessment: deepClone(soapNote.assessment),
    plan: deepClone(soapNote.plan),
  };

  const updateData: any = {
    ...soapNote,
    ...serialized,
    events: {
      create: [{
        type: EventType.SOAP_NOTE_UPDATED,
        created_by_id: createdById,
        appointment_id: soapNote.appointment_id
      }]
    }
  };

  const updatedSoapNote = await prisma.soapNote.update({
    where: { id: soapNote.id },
    data: updateData,
  })

  return { data: updateData };
}

async function findSoapNote(Id: string) {
  const soapNote = await prisma.soapNote.findUnique({
    where: { id: Id },
    include: {
      events: {
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          type: true,
          created_by_id: true,
          appointment_id: true,
          created_at: true,
          updated_at: true
        }
      }
    }
  });

  if (!soapNote) {
    throw new Error("SOAP note not found");
  }

  return soapNote;
}

async function findSoapNotes(
  userId: string,
  role: UserType | ProviderRoleTitle
) {
  let whereClause: any = {};

  if (role === UserType.PATIENT) {
    whereClause.patient_id = userId;
  } else if (
    Object.values(ProviderRoleTitle).includes(role as ProviderRoleTitle)
  ) {
    if (role === ProviderRoleTitle.ADMIN || role === ProviderRoleTitle.RECEPTIONIST) {
      whereClause = {};
    } else {
      whereClause.provider_id = userId;
    }
  } else {
    throw new Error("Invalid user role");
  }

  const soapNotes = await prisma.soapNote.findMany({
    where: whereClause,
    include: {
      events: {
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          type: true,
          created_by_id: true,
          appointment_id: true,
          created_at: true,
          updated_at: true,
        },
      },
    },
  });

  return soapNotes;
}

async function deleteSoapNote(
  soapNoteId: string,
  userId: string,
  role: ProviderRoleTitle
) {
  const existingNote = await prisma.soapNote.findUnique({
    where: { id: soapNoteId },
    select: {
      id: true,
      appointment: {
        select: {
          appointment_providers: true,
        },
      },
    },
  });

  if (!existingNote) {
    throw new Error("SOAP note not found");
  }

  const assignedProviderIds = existingNote.appointment?.appointment_providers?.map(p => p.id) || [];
  const isOwner = assignedProviderIds.includes(userId);

  const isAdminOrReceptionist =
    role === ProviderRoleTitle.ADMIN || role === ProviderRoleTitle.RECEPTIONIST;

  if (!isOwner && !isAdminOrReceptionist) {
    throw new Error("Unauthorized to delete this SOAP note");
  }

  await prisma.soapNote.delete({
    where: { id: soapNoteId },
  });

  return { message: "SOAP note deleted successfully" };
}

// for nested soap_note in appointment create
function buildSoapNoteNestedCreateInput(
  payload: SoapNoteRecord | undefined,
  createdById: string
): { create: Omit<SoapNoteRecord, 'events'> & { events: { create: { type: EventType, created_by_id: string }[] } } } | undefined {
  if (!payload) return undefined;

  const { events, ...rest } = payload;

  return {
    create: {
      ...rest,
      events: {
        create: [
          {
            type: EventType.SOAP_NOTE_RECORDED,
            created_by_id: createdById,
          }
        ]
      }
    }
  };
}

export default {
  createSoapNote,
  updateSoapNote,
  findSoapNote,
  findSoapNotes,
  deleteSoapNote,
  buildSoapNoteNestedCreateInput
};

