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
import axios from 'axios'
import { toast } from 'sonner'

const GoogleModal = ({ open }: { open?: boolean }) => {
  const [searchParams] = useSearchParams()

  const isOnboarding = !!searchParams.get('onboarding')

  if (!isOnboarding) return

  const handleClick = async () => {
    const res = await axios.get('/api/auth/google', { withCredentials: true })
    if (!res || !res.data || !res.data.success) {
      toast.error('Error connecting to google')
    }

    location.assign(res.data.data)
  }

  return (
    <Dialog defaultOpen={isOnboarding} open={open}>
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
