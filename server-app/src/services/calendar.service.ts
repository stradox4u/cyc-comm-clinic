import { calendar_v3, google } from 'googleapis'
import googleapis from '../config/googleapis.js'
import type { Credentials } from 'google-auth-library'
import logger from '../middlewares/logger.js'

const calendar = (tokens: Credentials) => {
  googleapis.oauth2Client.setCredentials(tokens)

  return google.calendar({ version: 'v3', auth: googleapis.oauth2Client })
}

const createCalendarEvent = async (
  tokens: Credentials,
  payload: { summary: string; description: string; start: string; end: string }
) => {
  const event: calendar_v3.Schema$Event = {
    summary: payload.summary,
    description: payload.description,
    start: {
      dateTime: payload.start,
      timeZone: 'Africa/Lagos',
    },
    end: {
      dateTime: payload.end,
      timeZone: 'Africa/Lagos',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  }

  const res = await calendar(tokens).events.insert({
    calendarId: 'primary',
    requestBody: event,
  })
  if (!res.ok) {
    logger.error('Calendar API Error setting up calendar event: ' + res.data)
  }

  return res.data
}

const updateCalendarEvent = async (
  tokens: Credentials,
  eventId: string,
  updatedEvent: calendar_v3.Schema$Event
) => {
  const res = await calendar(tokens).events.update({
    calendarId: 'primary',
    eventId,
    requestBody: updatedEvent,
  })

  return res.data
}

const deleteCalendarEvent = async (tokens: Credentials, eventId: string) => {
  await calendar(tokens).events.delete({
    calendarId: 'primary',
    eventId,
  })

  return { success: true }
}

export default {
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
}
