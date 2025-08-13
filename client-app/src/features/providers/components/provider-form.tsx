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
import type { CreateProviderSchema } from '../schema'

interface Props {
  formData: Partial<CreateProviderSchema>
  setFormData: (formData: Partial<CreateProviderSchema>) => void
  onSubmit: (e: FormEvent) => void
  isLoading: boolean
}

const ProviderForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: Props) => {
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

          {'role_title' in formData && (
            <div className="space-y-2">
              <Label htmlFor="role_title">Role</Label>
              <Select
                value={formData.role_title}
                onValueChange={(value) =>
                  handleInputChange('role_title', value)
                }
                defaultValue={formData.role_title}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GENERAL_PRACTIONER">
                    GENERAL PRACTIONER
                  </SelectItem>
                  <SelectItem value="NURSE">NURSE</SelectItem>
                  <SelectItem value="GYNAECOLOGIST">GYNAECOLOGIST</SelectItem>
                  <SelectItem value="LAB_TECHNICIAN">LAB TECHNICIAN</SelectItem>
                  <SelectItem value="RECEPTIONIST">RECEPTIONIST</SelectItem>
                  <SelectItem value="PAEDIATRICIAN">PAEDIATRICIAN</SelectItem>
                  <SelectItem value="PHARMACIST">PHARMACIST</SelectItem>
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
export default ProviderForm
