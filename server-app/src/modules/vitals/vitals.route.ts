import express from 'express';
import vitalsController from './vitals.controller.js';
import { authorize, authenticate, authenticateMultipleUser } from '../../middlewares/auth.js';
import { ProviderRoleTitle } from '@prisma/client';
import vitalsValidation from './vitals.validation.js';
import validate from '../../middlewares/validate.js';
import { UserType } from '../../types/index.js';

const router = express.Router()

// Create and Read only
router.post(
    '/record',
    authenticate(UserType.PROVIDER),
    authorize(Object.values(ProviderRoleTitle)),
    validate(vitalsValidation.VitalsRecordSchema),
    vitalsController.recordVitals
);

router.get(
    '/:appointmentId',
    authenticateMultipleUser([UserType.PROVIDER, UserType.PATIENT]),
    vitalsController.getVitalsByAppointmentId
);

export default router
