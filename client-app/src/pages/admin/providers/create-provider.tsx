import type React from 'react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'
import ProviderForm from '../../../features/providers/components/provider-form'
import type { CreateProviderSchema } from '../../../features/providers/schema'
import { useCreateProvider } from '../../../features/providers/hook'

export default function CreateProvider() {
  const { mutate: createProvider, isPending } = useCreateProvider()

  const [formData, setFormData] = useState<CreateProviderSchema>({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    role_title: 'GENERAL_PRACTIONER',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createProvider(formData)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="flex h-14 items-center px-4 md:p-8 lg:px-32">
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Provider Form</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-4 p-4 md:p-8 lg:px-32 pt-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>New Provider Registration</CardTitle>
              <CardDescription>
                Please fill out all required information for provider
                registration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProviderForm
                formData={formData}
                // @ts-expect-error: pass partial data
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
