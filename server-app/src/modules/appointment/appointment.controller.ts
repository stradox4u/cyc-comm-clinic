import type {
    AppointmentRegisterSchema,
    AppointmentProviderSchema
} from './appointment.validation.js'
import appointmentService from './appointment.service.js'
import catchAsync from '../../utils/catchAsync.js'
import { UserType } from '../../types/index.js'
import vitalsService from '../vitals/vitals.service.js'
import soapnoteService from '../soapnote/soapnote.service.js'

const appointmentCreate = catchAsync(async (req, res) => {
    const newAppointment: AppointmentRegisterSchema = req.body

    const prismaCreateInput={
        ...newAppointment,
        purposes: Array.isArray(newAppointment.purposes)
          ? newAppointment.purposes
          : [newAppointment.purposes],
        patient: {
            connect: {
                id: newAppointment.patient_id.id
            },
        },
        patient_id: undefined,

        soap_note: soapnoteService.buildSoapNoteNestedCreateInput(newAppointment.soap_note),
        vitals: vitalsService.buildVitals(newAppointment.vitals),
        appointment_providers: appointmentService.buildProvidersCreate(newAppointment.appointment_providers),
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


export default {
    appointmentCreate
}