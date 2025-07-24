import { EventType } from "@prisma/client";
import { z } from 'zod';

const BaseEventSchema = z.object({
  type: z.enum(EventType),
  created_by_id: z.uuid(),
  vitals_id: z.uuid(),
  soap_note_id: z.uuid()
});

export const EventCreateSchema = BaseEventSchema;
export const EventFullSchema = BaseEventSchema.extend({
  id: z.uuid(),
  created_at: z.date(),
  updated_at: z.date()
});
