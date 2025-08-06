import { LogOut, Mail, MapPin, Phone, Settings, User } from 'lucide-react'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { useCheckPatientProfile } from '../../hooks/fetch-patient'
import { Skeleton } from '../../components/ui/skeleton'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth-store'
import ProfilePhoto from '../../components/profile-photo'

const PatientProfile = () => {
  const { user: patientData, loading } = useCheckPatientProfile()
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  if (loading) {
    return (
      <>
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-48" />
                </div>
              ))}
              <div>
                <Skeleton className="h-4 w-40 mb-1" />
                <Skeleton className="h-3 w-64 mb-1" />
                <Skeleton className="h-3 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!res.ok) throw new Error('Logout failed')

      logout()
      toast.success('Logged out successfully')
      navigate('/auth/patient/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout. Please try again.')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Profile Information</h2>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-">
        <Card>
          <div className="md:grid md:grid-cols-2">
            <ProfilePhoto photo={patientData?.image_url} />
            <div>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Full Name</div>
                    <div className="text-sm text-muted-foreground">
                      {patientData?.first_name} {patientData?.last_name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      {patientData?.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">
                      {patientData?.phone}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">
                      {patientData?.address}
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="font-medium">Date of Birth</div>
              <div className="text-sm text-muted-foreground">
                {patientData?.date_of_birth
                  ? new Date(patientData.date_of_birth).toLocaleDateString(
                      'en-GB',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )
                  : null}
              </div>
            </div>
            <div>
              <div className="font-medium">Blood Type</div>
              <div className="text-sm text-muted-foreground">
                {patientData?.blood_group}
              </div>
            </div>
            <div>
              <div className="font-medium">Allergies</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {patientData?.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium">Emergency Contact</div>
              <div className="text-sm text-muted-foreground">
                {patientData?.emergency_contact_name}{' '}
              </div>
              <div className="text-sm text-muted-foreground">
                {patientData?.emergency_contact_phone}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button
            className="w-fit 2xl:w-1/5"
            size={'sm'}
            variant={'destructive'}
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
export default PatientProfile
