export const getAppointments = async () => {
  const res = await fetch(`/api/appointment/appointments`)
  const data = await res.json()

  if (!data?.success) {
    throw new Error(data?.message || 'Failed to fetch appointments')
  }

  return data.data
}

export const getProviders = async () => {
  const res = await fetch(`/api/providers`)
  const data = await res.json()

  if (!data?.success) {
    throw new Error(data?.message || 'Failed to fetch providers')
  }

  return data.data
}
