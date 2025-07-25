// soapnote.service.ts

import type { SoapNote, Prisma } from "@prisma/client";
import prisma from "../../config/prisma.js";

export type SoapNoteCreateInput = Prisma.SoapNoteCreateInput;


async function createSoapNote(
  payload: SoapNoteCreateInput
): Promise<SoapNote> {
  return prisma.soapNote.create({
    data: payload
  });
}

function buildSoapNoteNestedCreateInput(
  payload: any
): { create: Omit<SoapNoteCreateInput, 'appointment'> } | undefined {
  if (!payload) return undefined;

  return {
    create: payload,
  };
}


export default {
  createSoapNote,
  buildSoapNoteNestedCreateInput
};

