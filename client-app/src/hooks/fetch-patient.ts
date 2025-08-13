import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '../store/auth-store'
import API from '../lib/api'

export const useCheckPatientProfile = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuthStore()
  const [loading, setLoading] = useState(true)

  const firstLoad = useRef(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(false) // already has user
        return
      }

      try {
        const res = await fetch('/api/auth/patient/profile', {
          method: 'GET',
          credentials: 'include',
        })

        if (!res.ok) {
          if (res.status === 401 && !firstLoad.current) {
            toast.error('Session expired. Please sign in.')
            navigate('/login')
          }
          return
        }

        const data = await res.json()
        setUser(data.data)
      } catch (error) {
        if (!firstLoad.current) {
          const message =
            error instanceof Error
              ? error.message
              : 'Session expired. Please sign in.'
          toast.error(message)
          navigate('/login')
        }
      } finally {
        setLoading(false)
        firstLoad.current = false // mark first attempt as done
      }
    }

    fetchProfile()
  }, [user, setUser, navigate])

  return { user, loading }
}

export const usePatientProfile = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const logout = useAuthStore((state) => state.logout)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/api/auth/patient/profile')

        if (!data || !data.success) {
          toast.error('Session expired. Please sign in.')
          navigate('/login')
          return
        }

        setUser(data.data)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Session expired. Please sign in.'
        toast.error(message)
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const logOut = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Logout failed')

      logout()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout. Please try again.')
    }
  }

  return { user, loading, logOut }
}
