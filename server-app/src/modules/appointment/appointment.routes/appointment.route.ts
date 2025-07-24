import express from 'express';
import validate from '../../../middlewares/validate.js';
import appointmentValidation from '../appointment.validation.js';
import appointmentController from '../appointment.controller.js';

const router = express.Router()

// General Appointment Routes
router.post(
    '/create',
    validate(appointmentValidation.appointmentRegisterSchema),
    appointmentController.appointmentCreate
)

{/*router.get(
    '/:appointmentId'
)

router.get(
    '/appointments'
)

router.put(
    '/:appointmentId'
)

router.patch(
    '/:appointment/Id'
)
*/}
export default router
