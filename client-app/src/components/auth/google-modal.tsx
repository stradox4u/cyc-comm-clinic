import { useSearchParams } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '../../store/auth-store'
import API from '../../lib/api'

const GoogleModal = ({ open = false }: { open?: boolean }) => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthStore()
  const onboarding = searchParams.get('onboarding')
  const isOnboarding = !!onboarding

  if (user?.has_calendar_access) return

  const handleClick = async () => {
    const res = await API.get('/api/auth/google', { withCredentials: true })
    if (!res || !res.data || !res.data.success) {
      toast.error('Error connecting to google')
    }

    location.assign(res.data.data)
  }

  return (
    <Dialog defaultOpen={onboarding ? isOnboarding : open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Welcome on board 🎉🎉🎉
          </DialogTitle>
          <br />
          <DialogDescription className="my-20 text-center">
            We recommend you connect your calendar for better experience. This
            will help us setup your reminders for upcoming appointments.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mx-auto">
          <Button onClick={handleClick}>
            <Calendar />
            Allow Calendar Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default GoogleModal
