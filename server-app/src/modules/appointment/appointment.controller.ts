import type { Appointment } from '@prisma/client';
import type {
    AppointmentRegisterSchema,
    AppointmentProviderSchema,
} from './appointment.validation.js';
import { scheduleInfoSchema } from './appointment.validation.js';
import appointmentService from './appointment.service.js';
import catchAsync from '../../utils/catchAsync.js';
import { UserType } from '../../types/index.js';
import { 
    authorizeUserForViewingAppointment,
    getLoggedInUser,
    authorizeSensitiveAppointmentFields,
    logAppointmentEvents,
    canScheduleAppointment
} from './appointment.utils.js';

const appointmentCreate = catchAsync(async (req, res) => {
  const newAppointment: AppointmentRegisterSchema = req.body
  const loggedInUser = getLoggedInUser(req);

  try {
    authorizeSensitiveAppointmentFields(req, newAppointment);
  } catch (err: any) {
    return res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }

  const dateRaw = newAppointment.schedule.appointment_date;
  
  const appointmentDateTime = new Date(dateRaw);
  if (isNaN(appointmentDateTime.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid appointment date" 
    });
  }

  const existingAppointment = await appointmentService.findAppointmentByPatientAndDate(
    newAppointment.patient_id.id,
    appointmentDateTime
  );

  if (!existingAppointment) {

  } else {
    if (!existingAppointment.schedule) {
      throw new Error("Missing schedule data");
    }
    
    let rawSchedule = existingAppointment.schedule;
    if (typeof rawSchedule === "string") {
      try {
        rawSchedule = JSON.parse(rawSchedule);
      } catch {
        throw new Error("Schedule is not valid JSON");
      }
    }
    
    const parsedSchedule = scheduleInfoSchema.safeParse(rawSchedule);
    if (!parsedSchedule.success) {
      throw new Error("Invalid schedule data");
    }
    const schedule = parsedSchedule.data;
    const existingAppointmentDate = new Date(schedule.appointment_date);
    
    const check = canScheduleAppointment(appointmentDateTime, [existingAppointmentDate]);
    
    if (!check.allowed) {
      return res.status(400).json({
        success: false,
        message: check.reason
      });
    }
  }

  const prismaCreateInput: any = {
    ...newAppointment,
    purposes: Array.isArray(newAppointment.purposes)
    ? newAppointment.purposes
    : [newAppointment.purposes],
    other_purpose: typeof newAppointment.other_purpose === 'string' ? newAppointment.other_purpose : '',
    patient: {
      connect: {
        id: newAppointment.patient_id.id
      },
    },
    patient_id: undefined,
  };
  
  if (newAppointment.soap_note) {
    prismaCreateInput.soap_note = {
      create: newAppointment.soap_note
    };
  }
  
  if (newAppointment.vitals) {
    prismaCreateInput.vitals = {
      create: newAppointment.vitals
    }
  }
  
  if (newAppointment.appointment_providers) {
    prismaCreateInput.appointment_providers = {
      create: newAppointment.appointment_providers
    };
  }
  
  const savedAppointment = await appointmentService.createAppointment(prismaCreateInput)
  
  if (savedAppointment) {
    const vitalsId = (savedAppointment as any).vitals?.id ?? null;
    const soapNoteId = (savedAppointment as any).soap_note?.id ?? null;
    
    if (loggedInUser.role === "PROVIDER") {
      await logAppointmentEvents({
        userId: loggedInUser.id,
        appointmentId: savedAppointment.id,
        statusChanged: true,
        vitalsId,
        soapNoteId,
        soapNoteUpdated: false
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Appointment created succesfully',
      data: savedAppointment
    })
  } else {
    res.status(500).json({
      success: false,
      message: 'Failed to create appointment',
    })
  }
})

const getAppointment = catchAsync(async (req, res) => {
    const { appointmentId } = req.params;
    const loggedInUser = getLoggedInUser(req);

    const appointment = await appointmentService.findAppointment({id: appointmentId });

    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: 'Appointment not found'
        });
    }

    try {
        authorizeUserForViewingAppointment(appointment, loggedInUser);
    } catch (err: any) {
        return res.status(403).json({ success: false, message: err.message });
    }

    return res.status(200).json({
        success: true,
        message: 'Appointment found',
        data: appointment
    });
        
})

const getAppointments = catchAsync(async (req, res) => {
    const loggedInUser = getLoggedInUser(req);

    let appointments: Appointment[] = [];
    

    if (loggedInUser?.type === UserType.PATIENT) {
        appointments = await appointmentService.findAppointmentsByPatient(loggedInUser.id)
    } else if (loggedInUser?.type === UserType.PROVIDER) {
        appointments = await appointmentService.findAppointmentsByProvider(loggedInUser.id)
    } else {
        return res.status(403).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }

    return res.status(200).json({
        success: true,
        message: 'Appointments fetched successfully',
        data: appointments
    });
})

const updateAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;
  const loggedInUser = getLoggedInUser(req);
  const userId = loggedInUser.id;
  const updateData = req.body;

  const appointment = await appointmentService.findAppointment({
    id: appointmentId,
  });

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found',
    });
  }

  try {
    authorizeUserForViewingAppointment(appointment, loggedInUser);
    authorizeSensitiveAppointmentFields(req, updateData);
  } catch (err: any) {
    return res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }

  if (updateData.schedule) {
    const newAppointmentDate = new Date(updateData.schedule.appointment_date);

    const existingAppointment = await appointmentService.findAppointmentByPatientAndDate(
      appointment.patient_id, 
      newAppointmentDate
    );

    if (existingAppointment && existingAppointment.id !== appointmentId) {
      const parsedSchedule = scheduleInfoSchema.safeParse(existingAppointment.schedule);
      if (!parsedSchedule.success) {
        return res.status(400).json({ success: false, message: 'Invalid schedule data for existing appointment' });
      }

      const existingAppointmentDate = new Date(parsedSchedule.data.appointment_date);
      const check = canScheduleAppointment(newAppointmentDate, [existingAppointmentDate]);

      if (!check.allowed) {
        return res.status(400).json({ success: false, message: check.reason });
      }
    }

    const checkWorkHours = canScheduleAppointment(newAppointmentDate, []);
    if (!checkWorkHours.allowed) {
      return res.status(400).json({ success: false, message: checkWorkHours.reason });
    }
  }

  const previousStatus = appointment.status;
  const newStatus = updateData.status;

  const updatedAppointment = await appointmentService.updateAppointment(
    { id: appointmentId },
    updateData
  );

  const statusChanged = newStatus !== undefined && newStatus !== previousStatus;
  const soapNoteChanged = updateData.soap_note !== undefined;


  const soapNotes = updatedAppointment.soap_note ?? [];
  const latestSoapNote = soapNotes.length > 0 ? soapNotes[soapNotes.length - 1] : null;
  const soapNoteId = latestSoapNote?.id ?? null;

  const soapNoteUpdated = soapNoteChanged && (appointment.soap_note?.length ?? 0) > 0;

  if (loggedInUser.role === "PROVIDER") {
    await logAppointmentEvents({
      userId,
      appointmentId,
      statusChanged,
      vitalsId: updatedAppointment.vitals?.id ?? null,
      soapNoteId,
      soapNoteUpdated,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Appointment updated successfully',
    data: updatedAppointment,
  });
});

const appointmentDelete = catchAsync(async (req, res) => {
    const { appointmentId } = req.params;
    const loggedInUser = getLoggedInUser(req);

    const appointment = await appointmentService.findAppointment(appointmentId);

    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: 'Appointment not found'
        });
    }

    const deletedAppointment = await appointmentService.deleteAppointment({id: appointmentId});

    if (deletedAppointment) {
        return res.status(204).json()
    }

    return res.status(500).json({
        success: false,
        message: 'Failed to delete appointment'
    });
});

const assignApointmentProvider = catchAsync(async (req, res) => {
  const loggedInUser = getLoggedInUser(req);
  const newAppointmentProvider: AppointmentProviderSchema | undefined = req.body;

  if (!newAppointmentProvider) {
    return res.status(400).json({
      success: false,
      message: 'Appointment provider data is required'
    });
  }

  const { appointment_id } = newAppointmentProvider;

  const appointment = await appointmentService.findAppointment({ id: appointment_id });
  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  try {
    authorizeSensitiveAppointmentFields(req, appointment);
  } catch (err: any) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message
    });
  }

  const assignedProvider = await appointmentService.assignProvider({
    appointment: { connect: { id: newAppointmentProvider.appointment_id } },
    provider: { connect: { id: newAppointmentProvider.provider_id } }
  });

  return res.status(200).json({
    success: true,
    message: 'Appointment provider assigned successfully',
    data: assignedProvider
  });
});


export default {
    appointmentCreate,
    getAppointment,
    getAppointments,
    updateAppointment,
    appointmentDelete,
    assignApointmentProvider
}
