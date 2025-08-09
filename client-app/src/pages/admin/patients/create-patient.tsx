import type React from 'react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import PatientForm from '../../../features/patients/components/patient-form'
import type { CreatePatientSchema } from '../../../features/patients/schema'
import { useCreatePatient } from '../../../features/patients/hook'

export default function CreatePatient() {
  const { mutate: createPatient, isPending } = useCreatePatient()

  const [formData, setFormData] = useState<CreatePatientSchema>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'MALE',
    phone: '',
    email: '',
    password: '',
    address: '',
    blood_group: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    insurance_coverage: '',
    insurance_provider_id: '',
    allergies: [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const allergies = [formData.allergies as unknown as string]
    const date_of_birth = new Date(formData.date_of_birth).toISOString()

    createPatient({ ...formData, allergies, date_of_birth })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="flex h-14 items-center px-4">
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Add new Patient</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>New Patient Registration</CardTitle>
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
