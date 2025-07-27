import express from 'express';
import vitalsController from './vitals.controller.js';
import { authorize } from '../../middlewares/auth.js';
import { PROVIDER_ROLES } from '../../types/index.js';

const router = express.Router()

// Create and Read only
router.post(
    '/record',
    authorize(PROVIDER_ROLES),
    vitalsController.recordVitals
);

router.get(
    '/patient/:patientId',
    vitalsController.getVitalsByPatientId
);

router.get(
    '/provider/:providerId',
    authorize(PROVIDER_ROLES),
    vitalsController.getVitalsByProviderId
);

export default router
