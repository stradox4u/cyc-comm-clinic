import prisma from "../../config/prisma.js";
import type { LogEventOptions } from "./events.validation.js";

export async function logEvent(event: LogEventOptions) {
  try {
    const logged = await prisma.events.create({
      data: {
        type: event.type,
        created_by_id: event.created_by_id,
        appointment_id: event.appointment_id,
        vitals_id: event.vitals_id ?? null,
        soap_note_id: event.soap_note_id ?? null
      }
    });
    return logged;
  } catch (error) {
    console.error("Failed to log event:", error);
    throw error;
  }
}
