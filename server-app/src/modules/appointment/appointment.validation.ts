import { AppointmentPurpose, AppointmentStatus } from '@prisma/client';
import { z } from 'zod';
import { VitalsRecordSchema } from '../vitals/vitals.validation.js';
import { SoapNoteRecordSchema } from '../soapnote/soapnote.validation.js';

const appointmentProvidersSchema = z.object({
    appointment_id: z.uuid(),
    provider_id: z.uuid()
}).optional()

export type AppointmentProviderSchema = z.infer<typeof appointmentProvidersSchema>

export const scheduleInfoSchema = z.object({
    schedule_count: z.number(),
    appointment_date: z.coerce.date(),
    appointment_time: z
       .string()
       .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
          message: "Invalid time format (expected HH:mm or HH:mm:ss)",
    }),
})

export type ScheduleInfo = z.infer<typeof scheduleInfoSchema>;

const nestedAppointmentCreateSchema = z.object({
  patient: z.object({
    connect: z.object({ id: z.uuid() }),
  }),
  schedule: scheduleInfoSchema,
  purposes: z.array(z.enum(AppointmentPurpose)),
  status: z.enum(AppointmentStatus),
  has_insurance: z.boolean(),
  is_follow_up_required: z.boolean(),
});

const nestedFollowUpAppointmentsSchema = z.object({
  create: z.array(nestedAppointmentCreateSchema).optional(),
  connect: z.array(z.object({ id: z.uuid() })).optional(),
}).optional();

const nestedFollowUpAppointmentSchema = z.object({
  create: nestedAppointmentCreateSchema.optional(),
  connect: z.object({ id: z.uuid() }).optional(),
}).optional();

const appointmentRegisterSchema = z.object({
    patient_id: z.object({
        id: z.uuid(),
        first_name: z.string().min(1),
        last_name: z.string().min(1),
        insurance_provider_id: z.string().optional()
    }),
    schedule: scheduleInfoSchema,
    purposes: z.array(z.enum(AppointmentPurpose)),
    other_purpose: z.string().optional(),
    status: z.enum(AppointmentStatus).optional(),
    has_insurance: z.boolean(),
    is_follow_up_required: z.boolean().optional(),
    follow_up_id: z.uuid().optional(),
    follow_up_appointment: nestedFollowUpAppointmentSchema,
    follow_up_appointments: nestedFollowUpAppointmentsSchema,
    soap_note: SoapNoteRecordSchema.optional(),
    vitals: VitalsRecordSchema.optional(),
    appointment_providers: z.array(appointmentProvidersSchema).optional()
}).refine(data => !data.has_insurance || Boolean(data.patient_id.insurance_provider_id), {
  message: 'Insurance provider is required when patient has insurance',
  path: ['patient_id', 'insurance_provider_id']
})
.superRefine((data, ctx) => {
  const hasOthers = data.purposes.includes('OTHERS');

  if (hasOthers && !data.other_purpose) {
    ctx.addIssue({
      path: ['other_purpose'],
      code: 'custom',
      message: "You must provide 'other_purpose' when 'OTHERS' is selected in purposes"
    });
  }

  if (!hasOthers && data.other_purpose) {
    ctx.addIssue({
      path: ['other_purpose'],
      code: 'custom',
      message: "'other_purpose' should be empty unless 'OTHERS' is selected"
    });
  }

  if (data.status === 'COMPLETED' && typeof data.is_follow_up_required !== 'boolean') {
    ctx.addIssue({
      path: ['is_follow_up_required'],
      code: 'custom',
      message: "'is_follow_up_required' is required when status is 'COMPLETED'"
    });
  }

  if (data.status !== 'COMPLETED' && 'is_follow_up_required' in data) {
    ctx.addIssue({
      path: ['is_follow_up_required'],
      code: 'custom',
      message: "'is_follow_up_required' should only be provided when status is 'COMPLETED'"
    });
  }
});

export type AppointmentRegisterSchema = z.infer<typeof appointmentRegisterSchema>

export default {
  appointmentRegisterSchema,
  appointmentProvidersSchema,
  scheduleInfoSchema,
}
