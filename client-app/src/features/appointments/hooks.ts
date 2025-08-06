import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import API from '../../lib/api'
import type { Appointment } from '../../lib/type'
import type { AppointmentSchedule } from './types'
import { useNavigate } from 'react-router-dom'

const useAppointmentsByPatient = (userId: string | undefined) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState<
    (Appointment & { schedule: AppointmentSchedule })[]
  >([])

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)

      if (!userId) return navigate('/not-found')
      const { data } = await API.get(`/api/appointment/appointments/${userId}`)

      if (!data?.success) {
        toast.error(data?.message || 'Failed to fetch appointments')
      }
      setAppointments(data?.data ?? [])
      setLoading(false)
    }
    fetchAppointments()
  }, [userId])

  return { loading, appointments }
}

export { useAppointmentsByPatient }
