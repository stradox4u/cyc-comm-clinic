import { VitalsRecordSchema } from '../vitals/vitals.validation.js';
import { z } from 'zod';
type VitalsNestedCreateData = z.infer<typeof VitalsRecordSchema>;

function buildVitals(
  payload: VitalsNestedCreateData | undefined
): { create: VitalsNestedCreateData } | undefined {
  if (!payload) return undefined;

  return {
    create: payload,
  };
}


export default {
    buildVitals
}
