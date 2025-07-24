import { AppointmentPurpose, AppointmentStatus } from '@prisma/client';
import { z } from 'zod';
import { VitalsRecordSchema } from '../vitals/vitals.validation.js';
import { SoapNoteRecordSchema } from '../soapnote/soapnote.validation.js';

const scheduleInfoSchema = z.object({
    schedule_count: z.number(),
    appointment_date: z.coerce.date(),
    appointment_time: z
       .string()
       .regex(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
          message: "Invalid time format (expected HH:mm or HH:mm:ss)",
    }),
})

const appointmentRegisterSchema = z.object({
    id: z.uuid(),
    patient_id: z.object({
        id: z.uuid(),
        name: z.string().min(1),
        insurance_provider_id: z.string().optional()
    }),
    schedule: scheduleInfoSchema,
    purposes: z.enum(AppointmentPurpose),
    other_purpose: z.string().optional(),
    status: z.enum(AppointmentStatus),
    has_insurance: z.boolean(),
    is_follow_up_required: z.boolean(),
    follow_up_id: z.uuid().optional(),
    follow_up_appointment: z.lazy(() => z.object({})).optional(),
    follow_up_appointments: z.array(z.object({})).optional(),
    soap_note: SoapNoteRecordSchema.optional(),
    vitals: VitalsRecordSchema.optional(),
    appointment_providers: z.array(z.object({})).optional()
}).refine(data => !data.has_insurance || Boolean(data.patient_id.insurance_provider_id), {
  message: 'Insurance provider is required when patient has insurance',
  path: ['patient_id', 'insurance_provider_id']
})

export type AppointmentRegisterSchema = z.infer<typeof appointmentRegisterSchema>

const appointmentProvidersSchema = z.object({
    appointment_id: z.uuid(),
    provider_id: z.uuid()
})

export type AppointmentProviderSchema = z.infer<typeof appointmentProvidersSchema>
