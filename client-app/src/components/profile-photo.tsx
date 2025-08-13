import axios from 'axios'
import { Camera } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '../store/auth-store'

type ProfilePhotoProps = {
  photo: string | undefined
  patientId?: string
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ photo, patientId }) => {
  const [userPhoto, setUserPhoto] = useState<string>()
  const { user, setUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fileInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (photo) setUserPhoto(photo)
  }, [photo])

  const triggerFileInput = () => {
    fileInput.current?.click()
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)

    try {
      setUserPhoto(URL.createObjectURL(file))

      const { data } = await axios.get(
        `/api/auth/generate-url?fileType=${file.type}&fileName=${file.name}`
      )
      if (!data.success) toast.error('Error uploading photo')

      await axios.put(data.data.signedUrl, file, {
        headers: {
          'Content-Type': file.type,
          'Content-Length': file.size.toString(),
        },
      })

      const url = user?.role_title
        ? `/api/patients/${patientId}`
        : `/api/auth/patient/profile`

      const savedRes = await axios.put(url, {
        image_url: data.data.key,
      })
      if (!savedRes.data?.success) toast.error('Error uploading photo')

      setUser(savedRes.data.data)
      setUserPhoto(savedRes.data.data.image_url)
    } catch (err) {
      setUserPhoto('')
      toast.error('Failed to upload file' + (err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-6 md:m-12">
      <div className="relative text-center max-w-48 mx-auto">
        <img
          onClick={triggerFileInput}
          src={
            userPhoto ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
          alt="Profile Image"
          className="mx-auto cursor-pointer shadow-md dark:bg-black size-48 rounded-full object-cover"
        />
        <button
          onClick={triggerFileInput}
          className="absolute cursor-pointer shadow-lg bottom-[0%] right-[10%] p-2 bg-black text-white rounded-full"
          disabled={isLoading}
        >
          <Camera className="flex" />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  )
}

export default ProfilePhoto
