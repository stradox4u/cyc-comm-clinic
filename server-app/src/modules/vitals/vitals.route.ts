import express from 'express';
import vitalsController from './vitals.controller.js';
import { authorize, authenticate, authenticateMultipleUser } from '../../middlewares/auth.js';
import { PROVIDER_ROLES } from '../../types/index.js';
import vitalsValidation from './vitals.validation.js';
import validate from '../../middlewares/validate.js';
import { UserType } from '../../types/index.js';

const router = express.Router()

// Create and Read only
router.post(
    '/record',
    authenticate(UserType.PROVIDER),
    authorize(PROVIDER_ROLES),
    validate(vitalsValidation.VitalsRecordSchema),
    vitalsController.recordVitals
);

router.get(
    '/:patientId',
    authenticateMultipleUser([UserType.PROVIDER, UserType.PATIENT]),
    vitalsController.getVitalsByPatientId
);

router.get(
    '/:providerId',
    authenticate(UserType.PROVIDER),
    authorize(PROVIDER_ROLES),
    vitalsController.getVitalsByProviderId
);

export default router
