import express from 'express';

const router = express.Router()

// Provider Specific Appointment Route 
router.get(
    '/:id/appointments'
)

router.get(
    '/:id/appointments/:appointmentId'
)

router.get(
    '/:id/appointments/search'
)

// Search by status ?


router.delete(
    '/:id/appointments'
)