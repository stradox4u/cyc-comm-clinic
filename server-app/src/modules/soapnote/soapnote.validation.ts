import { z } from 'zod';
import { VitalsRecordSchema } from '../vitals/vitals.validation.js';
import { EventFullSchema } from '../events/events.validation.js';

const subjectiveSchema = z.object({
    symptoms: z.array(z.string()),
    purpose_of_appointment: z.array(z.string()),
    others: z.string()
}).partial()

const objectiveSchema = z.object({
    physical_exam_report: z.array(z.string()),
    vitals_summary: VitalsRecordSchema,
    labs: z.record(z.string(), z.unknown()),
    others: z.string()
}).partial()

const assessmentSchema = z.object({
    diagnosis: z.array(z.string()),
    preferential: z.array(z.string()),
}).partial()

const prescriptionSchema = z.object({
    medication_name: z.string(),
    dosage: z.string(),
    frequency: z.string(),
    duration: z.string(),
    instructions: z.string(),
    start_date: z.date()
})

const planSchema = z.object({
    prescription: prescriptionSchema,
    test_requests: z.record(z.string(), z.unknown()),
    recommendation: z.record(z.string(), z.unknown()),
    has_referral : z.boolean(),
    referred_provider_name: z.string().optional(),
    others: z.string()
}).partial()

export const SoapNoteRecordSchema = z.object({
    subjective: subjectiveSchema,
    objective: objectiveSchema,
    assessment: assessmentSchema,
    plan: planSchema,
    created_by_id: z.uuid(),
    events: z.array(EventFullSchema).nonempty()
})

export type SoapNoteRecord = z.infer<typeof SoapNoteRecordSchema>
