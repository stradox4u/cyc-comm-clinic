import type { VitalsRecord } from "./vitals.validation.js";
import vitalsService from "./vitals.service.js"
import catchAsync from "../../utils/catchAsync.js";
import { 
    getLoggedInUser,
} from '../appointment/appointment.utils.js';

const recordVitals = catchAsync(async (req, res) => {
  const newVitals: VitalsRecord = req.body;
  const loggedInUser = getLoggedInUser(req);

  const appointmentId = newVitals.appointment_id;
  if (!appointmentId) {
    return res.status(400).json({
      success: false,
      message: 'appointment_id is required to record vitals',
    });
  }

  const { events, appointment_id, ...restVitals } = newVitals;

  const prismaCreateInput = {
    ...restVitals,
    ...(events ? { events: { create: events } } : {}),
    appointment: {
      connect: { id: appointmentId },
    },
  };

  const savedVitals = await vitalsService.recordVitals(prismaCreateInput);

  res.status(201).json({
    success: true,
    message: 'Vitals recorded successfully',
    data: savedVitals,
  });
});

const getVitalsByPatientId = catchAsync(async (req, res) => {
  const { patientId } = req.params;

  if (!patientId) {
    return res.status(400).json({ success: false, message: 'patientId is required' });
  }

  const vitals = await vitalsService.getVitalsByPatientId(patientId);

  res.status(200).json({
    success: true,
    data: vitals,
  });
});

const getVitalsByProviderId = catchAsync(async (req, res) => {
  const { providerId } = req.params;

  if (!providerId) {
    return res.status(400).json({ success: false, message: 'providerId is required' });
  }

  const vitals = await vitalsService.getVitalsByProviderId(providerId);

  res.status(200).json({
    success: true,
    data: vitals,
  });
});

export default {
  recordVitals,
  getVitalsByPatientId,
  getVitalsByProviderId,
};
