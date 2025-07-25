import express from 'express';
import validate from '../../../middlewares/validate.js';
import { authenticateMultipleUser } from '../../../middlewares/auth.js';
import { UserType } from '../../../types/index.js';
import appointmentValidation from '../appointment.validation.js';
import appointmentController from '../appointment.controller.js';

const router = express.Router()

// General Appointment Routes For both Patients and Providers
router.post(
    '/create',
    authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
    validate(appointmentValidation.appointmentRegisterSchema),
    appointmentController.appointmentCreate
)

router.get(
    '/:appointmentId',
    authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
    appointmentController.getAppointment
)

router.get(
    '/appointments',
    authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
    appointmentController.getAppointments
)

router.put(
    '/:appointmentId',
    authenticateMultipleUser([UserType.PATIENT, UserType.PROVIDER]),
    appointmentController.updateAppointment
)

{/*router.patch(
    '/:appointment/Id'
)
*/}
export default router
