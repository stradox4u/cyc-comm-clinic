export type AppointmentSchedule = {
  appointment_date: string | Date
  appointment_time: string
  change_count: number
}

export type ProviderCreateAppointment = {
  patient_id: string
  schedule: AppointmentSchedule
  purposes: string
  has_insurance?: boolean | undefined
  other_purpose: string
}
