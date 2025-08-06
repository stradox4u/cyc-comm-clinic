import express from 'express';
import { authorize, authenticate } from '../../../middlewares/auth.js';
import appointmentController from '../appointment.controller.js';
import { UserType } from '../../../types/index.js';
import validate from '../../../middlewares/validate.js';
import appointmentValidation from '../appointment.validation.js';
import { ProviderRoleTitle } from '@prisma/client';

const router = express.Router()

router.use(authenticate(UserType.PROVIDER))

// Provider Specific Appointment Route 

//Assign Provider
router.patch(
    '/assign-provider',
    authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
    validate(appointmentValidation.appointmentProvidersSchema),
    appointmentController.assignAppointmentProvider
)

//Delete appointment
router.delete(
    '/delete/:appointmentId',
    authorize([ProviderRoleTitle.ADMIN, ProviderRoleTitle.RECEPTIONIST]),
    appointmentController.appointmentDelete
)

// Wait time tracking
router.get(
    '/waittime',
    authorize(Object.values(ProviderRoleTitle)),
    appointmentController.waitTimeTracking
)

// No show rate
router.get(
    '/no-show-rates',
    authorize(Object.values(ProviderRoleTitle)),
    appointmentController.getNoShowRates
)

export default router