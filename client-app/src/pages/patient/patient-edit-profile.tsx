import type React from 'react'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { useNavigate } from 'react-router-dom'
import API from '../../lib/api'
import { useAuthStore } from '../../store/auth-store'
import { toast } from 'sonner'
import PatientForm from '../../features/patients/components/patient-form'

export default function PatientEditProfile() {
  const navigate = useNavigate()
  const { user, setUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '' as 'MALE' | 'FEMALE',
    phone: '',
    address: '',
    blood_group: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    insurance_coverage: '' as string | null,
    insurance_provider_id: '' as string | null,
    allergies: [''],
  })

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        date_of_birth: user.date_of_birth as string,
        gender: user.gender,
        phone: user.phone,
        address: user.address,
        blood_group: user.blood_group,
        emergency_contact_name: user.emergency_contact_name,
        emergency_contact_phone: user.emergency_contact_phone,
        insurance_coverage: user.insurance_coverage,
        allergies: user.allergies,
        insurance_provider_id: user.insurance_provider_id,
      })
    }
  }, [user])

  const updateProfile = async () => {
    setIsLoading(true)
    try {
      const { data } = await API.put('/api/auth/patient/profile', formData)
      if (!data || !data.success) {
        toast.error(data?.message || 'Error updating profile')
      }
      toast.success(data.message)
      setUser(data.data)
      navigate('/profile')
    } catch (err) {
      console.log(err)
      toast.error('Error updating profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const allergies =
      typeof formData.allergies === 'string'
        ? [formData.allergies as unknown as string]
        : typeof formData.allergies === 'object'
        ? [...(formData.allergies as unknown as string)]
        : []
    const date_of_birth = formData.date_of_birth
      ? new Date(formData.date_of_birth).toISOString()
      : formData.date_of_birth

    setFormData({ ...formData, allergies, date_of_birth })
    updateProfile()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="flex h-14 items-center px-4 md:p-8 lg:px-32">
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Biodata Update Form</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 lg:px-32 pt-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Please fill out all required information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formData.first_name && (
                <PatientForm
                  // @ts-expect-error: exclude email & password
                  formData={{
                    ...formData,
                    insurance_provider_id: user!.insurance_provider_id,
                  }}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
