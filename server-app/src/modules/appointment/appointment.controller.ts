import type {
    AppointmentRegisterSchema
} from './appointment.validation.js'
import appointmentService from './appointment.service.js'
import catchAsync from '../../utils/catchAsync.js'
import { UserType } from '../../types/index.js'

async function authorizeUserForAppointment(appointment: any, user: any) {
  if (!user) throw new Error('User not authenticated');

  if (user.type === UserType.PATIENT) {
    if (appointment.patient_id !== user.id) {
      throw new Error('Access denied: Not your appointment');
    }
  } else if (user.type === UserType.PROVIDER) {
    const isAssignedProvider = appointment.appointment_providers?.some(
      (p: any) => p.provider_id === user.id
    );
    if (!isAssignedProvider) {
      throw new Error('Access denied: Not assigned to this appointment');
    }
  } else {
    throw new Error('Unauthorized user type');
  }
}

const appointmentCreate = catchAsync(async (req, res) => {
    const newAppointment: AppointmentRegisterSchema = req.body

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
        };
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
    const loggedInUser = req.user;

    if (!loggedInUser) {
        return res.status(401).json({
            success: false,
            message: 'User not authenticated',
        });
    }

    const appointment = await appointmentService.findAppointment(appointmentId);

    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: 'Appointment not found'
        });
    }

    try {
        await authorizeUserForAppointment(appointment, loggedInUser);
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
    const loggedInUser = req.user;

    if (!loggedInUser) {
        return res.status(401).json({
           success: false,
           message: 'User not authenticated',
        });
    }

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
    const loggedInUser = req.user;
    const updateData = req.body;

    const appointment = await appointmentService.findAppointment(appointmentId);

    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: 'Appointment not found'
        });
    }
    
    try {
        await authorizeUserForAppointment(appointment, loggedInUser);
    } catch (err: any) {
        return res.status(403).json({ success: false, message: err.message });
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

    const appointment = await appointmentService.findAppointment(appointmentId);

    if (!appointment) {
        return res.status(404).json({
            success: false,
            message: 'Appointment not found'
        });
    }

    const deletedAppointment = await appointmentService.deleteAppointment(appointmentId);

    if (deletedAppointment) {
        return res.status(204).json()
    }

    return res.status(500).json({
        success: false,
        message: 'Failed to delete appointment'
    });
});

export default {
    appointmentCreate,
    getAppointment,
    getAppointments,
    updateAppointment,
    appointmentDelete,
}
