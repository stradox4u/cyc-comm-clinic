import prisma from '../../../config/prisma.js'
import type { Prisma, CalendarToken } from '@prisma/client'

export type CalendarTokenWhereUniqueInput = Prisma.CalendarTokenWhereUniqueInput
export type CalendarTokenUncheckedCreateInput =
  Prisma.CalendarTokenUncheckedCreateInput

const findCalendarToken = async (
  filter: CalendarTokenWhereUniqueInput
): Promise<CalendarToken | null> => {
  return await prisma.calendarToken.findUnique({
    where: filter,
  })
}

const updateorCreateCalendarToken = async (
  filter: CalendarTokenWhereUniqueInput,
  payload: CalendarTokenUncheckedCreateInput
): Promise<CalendarToken> => {
  return await prisma.calendarToken.upsert({
    where: filter,
    update: payload,
    create: payload,
  })
}

const deleteCalendarToken = async (
  filter: CalendarTokenWhereUniqueInput
): Promise<CalendarToken | null> => {
  return await prisma.calendarToken.delete({
    where: filter,
  })
}

export default {
  findCalendarToken,
  updateorCreateCalendarToken,
  deleteCalendarToken,
}
