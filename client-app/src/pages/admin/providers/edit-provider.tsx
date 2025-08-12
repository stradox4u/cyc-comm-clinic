import type React from 'react'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import ProviderForm from '../../../features/providers/components/provider-form'
import type { UpdateProviderSchema } from '../../../features/providers/schema'
import {
  useProvider,
  useUpdateProvider,
} from '../../../features/providers/hook'
import { useParams } from 'react-router-dom'

export default function EditProvider() {
  const { id } = useParams()
  const { data: providerData } = useProvider(id)
  const { mutate: updateProvider, isPending } = useUpdateProvider()

  const [formData, setFormData] = useState<UpdateProviderSchema>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role_title: 'GENERAL_PRACTIONER',
  })

  useEffect(() => {
    if (providerData?.data) setFormData(providerData.data)
  }, [providerData?.data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    updateProvider({ id, payload: formData })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="flex h-14 items-center px-4 md:p-8 lg:px-32">
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Provider Update Form</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 lg:px-32 pt-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Edit Provider Profile</CardTitle>
              <CardDescription>
                Please fill out all required information for provider
                registration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProviderForm
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
