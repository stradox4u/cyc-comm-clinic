import { EventType } from "@prisma/client";
import { z } from 'zod';

const BaseEventSchema = z.object({
  type: z.enum(EventType),
  created_by_id: z.uuid(),
  vitals_id: z.uuid().optional(),
  soap_note_id: z.uuid().optional(),
  appointment_id: z.uuid(),
});

export const EventFullSchema = BaseEventSchema.extend({
  id: z.uuid(),
  created_at: z.date(),
  updated_at: z.date()
});

export type LogEventOptions = z.infer<typeof BaseEventSchema>;
export type EventLog = z.infer<typeof EventFullSchema>;

export default {
  EventFullSchema,
  BaseEventSchema
}