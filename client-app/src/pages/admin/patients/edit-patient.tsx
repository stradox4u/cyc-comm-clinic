import type React from 'react'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import PatientForm from '../../../features/patients/components/patient-form'
import type { UpdatePatientSchema } from '../../../features/patients/schema'
import { usePatient, useUpdatePatient } from '../../../features/patients/hook'
import { useParams } from 'react-router-dom'

export default function EditPatient() {
  const { id } = useParams()
  const { data: patientData } = usePatient(id)
  const { mutate: updatePatient, isPending } = useUpdatePatient()

  const [formData, setFormData] = useState<UpdatePatientSchema>({
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    gender: 'MALE',
    phone: '',
    address: '',
    blood_group: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    insurance_coverage: '',
    insurance_provider_id: '',
    allergies: [],
  })

  useEffect(() => {
    if (patientData?.data) setFormData(patientData.data)
  }, [patientData?.data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    const allergies =
      typeof formData.allergies === 'string'
        ? [formData.allergies as unknown as string]
        : typeof formData.allergies === 'object'
        ? [...(formData.allergies as unknown as string)]
        : []
    const date_of_birth = formData.date_of_birth
      ? new Date(formData.date_of_birth).toISOString()
      : formData.date_of_birth

    updatePatient({ id, payload: { ...formData, allergies, date_of_birth } })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="flex h-14 items-center px-4 md:p-8 lg:px-32">
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Patient Update Form</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 lg:px-32 pt-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Edit Patient Profile</CardTitle>
              <CardDescription>
                Please fill out all required information for patient
                registration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isPending}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
