import { PROVIDER_ROLES, UserType } from '../../types/index.js'
import vitalsService from '../vitals/vitals.service.js'
import soapnoteService from '../soapnote/soapnote.service.js';

export function authorizeUserForViewingAppointment(appointment: any, user: any) {
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

export function getLoggedInUser(req: any) {
  const user = req.user;
  console.log('getLoggedInUser req.user:', req.user);

  if (!user || !user.type) {
    const err: any = new Error('User not authenticated');
    err.statusCode = 401;
    throw err;
  }

  return user;
}

export function authorizeSensitiveAppointmentFields(req: any, updateData: any) {
  const loggedInUser = getLoggedInUser(req);
  const sensitiveFields = [
    'vitals',
    'soap_note',
    'appointment_providers',
    'follow_up'
];

  for (const field of sensitiveFields) {
    if (updateData[field]) {
      if (!loggedInUser?.roleTitle || !PROVIDER_ROLES.includes(loggedInUser.roleTitle)) {
        const err: any = new Error(`Only providers with valid roles can update ${field.replace('_', ' ')}`);
        err.statusCode = 403;
        throw err;
      }

      if (field === 'vitals') {
        updateData.vitals = vitalsService.buildVitals(updateData.vitals);
      }

      if (field === 'soap_note') {
        updateData.soap_note = soapnoteService.buildSoapNoteNestedCreateInput(updateData.soap_note);
      }
    }
  }
}

