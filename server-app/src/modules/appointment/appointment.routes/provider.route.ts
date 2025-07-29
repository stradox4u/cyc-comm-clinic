import express from 'express';
import { authorize } from '../../../middlewares/auth.js';
import appointmentController from '../appointment.controller.js';
import { PROVIDER_ROLES } from '../../../types/index.js';

const router = express.Router()

router.use(authorize(PROVIDER_ROLES))

// Provider Specific Appointment Route 

//Assign Provider
router.patch(
    '/assignprovider',
    authorize(['RECEPTIONIST', 'ADMIN']),
    appointmentController.assignApointmentProvider
)

// Search by status ?*/}

//Delete appointment
router.delete(
    '/delete/:appointmentId',
    appointmentController.appointmentDelete
)

export default router