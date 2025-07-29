import { z } from 'zod';
import { EventFullSchema } from '../events/events.validation.js';

export const VitalsRecordSchema = z.object({
    blood_pressure: z.string().optional(),
    heart_rate: z.string().optional(),
    temperature: z.string().optional(), 
    height: z.string().optional(),
    weight: z.string().optional(),
    created_by_id: z.uuid(),
    appointment_id: z.uuid(),
    events: z.array(EventFullSchema).nonempty() 
})

export type VitalsRecord = z.infer<typeof VitalsRecordSchema>;

export default {
    VitalsRecordSchema
}