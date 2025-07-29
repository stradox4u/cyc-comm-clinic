// soapnote.service.ts

import type { SoapNote, Prisma } from "@prisma/client";
import prisma from "../../config/prisma.js";
import type { SoapNoteRecord } from "./soapnote.validation.js";

export type SoapNoteCreateInput = Prisma.SoapNoteCreateInput;

async function createSoapNote(
  payload: SoapNoteCreateInput
): Promise<SoapNote> {
  return prisma.soapNote.create({
    data: payload
  });
}

// for nested soap_note in appointment create
function buildSoapNoteNestedCreateInput(
  payload: SoapNoteRecord
): { create: Omit<SoapNoteRecord, 'appointment'> } | undefined {
  if (!payload) return undefined;

  return {
    create: payload,
  };
}

export default {
  createSoapNote,
  buildSoapNoteNestedCreateInput
};

