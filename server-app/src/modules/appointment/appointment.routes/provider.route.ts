import express from 'express';
import { authorize } from '../../../middlewares/auth.js';
import appointmentController from '../appointment.controller.js';

const router = express.Router()

router.use(authorize())

// Provider Specific Appointment Route 


// Search by status ?*/}
router.delete(
    '/delete/:appointmentId',
    appointmentController.appointmentDelete
)

export default router