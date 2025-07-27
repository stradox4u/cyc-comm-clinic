import type {
    AppointmentRegisterSchema,
    AppointmentProviderSchema
} from './appointment.validation.js'
import appointmentService from './appointment.service.js'
import catchAsync from '../../utils/catchAsync.js'
import { UserType } from '../../types/index.js'
import { 
    authorizeUserForViewingAppointment,
    getLoggedInUser,
    authorizeSensitiveAppointmentFields
 } from './appointment.utils.js'

const appointmentCreate = catchAsync(async (req, res) => {
    const newAppointment: AppointmentRegisterSchema = req.body
    const loggedInUser = getLoggedInUser(req);

    try {
        authorizeSensitiveAppointmentFields(req, newAppointment);
    } catch (err: any) {
        return res.status(err.statusCode || 400).json({ success: false, message: err.message });
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

    let appointments = [];
    

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
  let updateData = req.body;

  const appointment = await appointmentService.findAppointment({id: appointmentId });

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  try {
    authorizeUserForViewingAppointment(appointment, loggedInUser);
    authorizeSensitiveAppointmentFields(req, updateData);
  } catch (err: any) {
    return res.status(err.statusCode || 400).json({ success: false, message: err.message });
  }

  const updatedAppointment = await appointmentService.updateAppointment(
    { id: appointmentId },
    updateData
  );

  return res.status(200).json({
    success: true,
    message: 'Appointment updated successfully',
    data: updatedAppointment
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
