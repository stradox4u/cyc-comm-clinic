export const getAppointments = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment/appointments`)
  const data = await res.json()

  if (!data?.success) {
    throw new Error(data?.message || 'Failed to fetch appointments')
  }

  return data.data
}

export const getProviders = async () => {
  const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/providers`)
  const data = await res.json()

  if (!data?.success) {
    throw new Error(data?.message || 'Failed to fetch providers')
  }

  return data.data
}
