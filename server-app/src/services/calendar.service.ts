import { calendar_v3, google } from 'googleapis'
import googleapis from '../config/googleapis.js'
import type { Credentials } from 'google-auth-library'

const calendar = (tokens: Credentials) => {
  googleapis.oauth2Client.setCredentials(tokens)

  return google.calendar({ version: 'v3', auth: googleapis.oauth2Client })
}

const createCalendarEvent = async (
  tokens: Credentials,
  event: calendar_v3.Schema$Event
) => {
  const res = await calendar(tokens).events.insert({
    calendarId: 'primary',
    requestBody: event,
  })

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
