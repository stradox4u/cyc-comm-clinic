import type { FormEvent } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select'
import { Separator } from '../../../components/ui/separator'
import type { CreatePatientSchema } from '../schema'
import { useInsuranceProviders } from '../../insuranceProviders/hook'
import type { InsuranceProvider } from '../../insuranceProviders/types'
import { Textarea } from '../../../components/ui/textarea'
import { format } from 'date-fns'

interface Props {
  formData: Partial<CreatePatientSchema> | CreatePatientSchema
  setFormData: (
    formData: Partial<CreatePatientSchema> | CreatePatientSchema
  ) => void
  onSubmit: (e: FormEvent) => void
  isLoading: boolean
}

const PatientForm = ({ formData, setFormData, onSubmit, isLoading }: Props) => {
  const { data: insuranceProvidersData } = useInsuranceProviders({
    page: 1,
    limit: 50,
  })

  const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {'first_name' in formData && (
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  handleInputChange('first_name', e.target.value)
                }
                required
              />
            </div>
          )}
          {'last_name' in formData && (
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                required
              />
            </div>
          )}
          {'date_of_birth' in formData && (
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth *</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={
                  formData.date_of_birth
                    ? format(new Date(formData.date_of_birth), 'yyyy-MM-dd')
                    : formData.date_of_birth
                }
                onChange={(e) =>
                  handleInputChange('date_of_birth', e.target.value)
                }
                required
              />
            </div>
          )}
          {'gender' in formData && (
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {'email' in formData && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
          )}
          {'password' in formData && (
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
            </div>
          )}
          {'phone' in formData && (
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>
          )}
          {'address' in formData && (
            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                required
              />
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {'emergency_contact_name' in formData && (
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_name">
                Emergency Contact Name *
              </Label>
              <Input
                id="emergency_contact_name"
                value={formData.emergency_contact_name}
                onChange={(e) =>
                  handleInputChange('emergency_contact_name', e.target.value)
                }
                required
              />
            </div>
          )}
          {'emergency_contact_phone' in formData && (
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_phone">
                Emergency Contact Phone *
              </Label>
              <Input
                id="emergency_contact_phone"
                type="tel"
                value={formData.emergency_contact_phone}
                onChange={(e) =>
                  handleInputChange('emergency_contact_phone', e.target.value)
                }
                required
              />
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Medical History */}
      <div>
        <h3 className="text-lg font-medium mb-4">Medical History</h3>
        <div className="space-y-4">
          {'blood_group' in formData && (
            <div className="space-y-2">
              <Label htmlFor="blood_group">Blood Group</Label>
              <Select
                value={formData.blood_group}
                onValueChange={(value) =>
                  handleInputChange('blood_group', value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                  {BLOOD_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {'allergies' in formData && (
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder="List any known allergies..."
              />
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Insurance Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Insurance Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {'insurance_coverage' in formData && (
            <div className="space-y-2">
              <Label htmlFor="insurance_coverage">
                Insurance Provider Coverage
              </Label>
              <Input
                id="insurance_coverage"
                value={
                  formData.insurance_coverage
                    ? formData.insurance_coverage
                    : undefined
                }
                onChange={(e) =>
                  handleInputChange('insurance_coverage', e.target.value)
                }
                placeholder="e.g., Blue Cross Blue Shield"
                required={false}
              />
            </div>
          )}
          {'insurance_provider_id' in formData && (
            <div className="space-y-2">
              <Label htmlFor="insurance_provider_id">Insurance ID</Label>
              <Select
                value={formData.insurance_provider_id || undefined}
                onValueChange={(value) =>
                  handleInputChange('insurance_provider_id', value)
                }
                required={false}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select insurance provider" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceProvidersData?.data?.map(
                    (provider: InsuranceProvider) => (
                      <SelectItem key={provider?.id} value={provider?.id}>
                        {provider?.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button disabled={isLoading} type="submit">
          Submit Profile
        </Button>
      </div>
    </form>
  )
}
export default PatientForm
