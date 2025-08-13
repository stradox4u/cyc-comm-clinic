import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { Mail, AlertCircle } from 'lucide-react'

import AuthLayout from '../layout/AuthLayout'
import { forgotPasswordSchema, type ForgotPasswordData } from '../lib/schema'
import ResetPasswordForm from './reset-password'
import { useSearchParams } from 'react-router-dom'
import API from '../lib/api'

const ForgotPasswordPage = () => {
  // Default to "patient", fallback to "provider"

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [searchParams] = useSearchParams()
  const userTypeParam = searchParams.get('type')
  const resolvedUserType = userTypeParam === 'patient' ? 'patient' : 'provider'

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsSubmitting(true)

    try {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/api/auth/${resolvedUserType}/forgot-password`
      const { data: resData } = await API.post(url, data)

      if (!resData?.success) {
        toast.error(resData?.message || 'Failed to send reset email')
        return
      }

      setSubmittedEmail(data.email)
      setIsEmailSent(true)
      toast.success('Please check your email for password reset instructions.')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Forgot password error:'

      if (message?.toLowerCase().includes('not found')) {
        setError('email', {
          type: 'manual',
          message: 'No account found with this email address',
        })
      } else {
        toast.error(message || 'Failed to send reset email.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendEmail = async () => {
    setIsSubmitting(true)
    try {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/api/auth/${resolvedUserType}/forgot-password`
      await API.post(url, { email: submittedEmail })

      toast.success('Password reset email sent again.')
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to resend email'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isEmailSent) {
    return (
      <ResetPasswordForm
        userType={resolvedUserType}
        submittedEmail={submittedEmail}
        onResend={handleResendEmail}
        isResending={isSubmitting}
      />
    )
  }

  console.log(resolvedUserType)

  return (
    <AuthLayout>
      <div className="w-full mx-auto">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Forgot Password?
            </CardTitle>
            <CardDescription>
              Enter your email address and we’ll send you a link to reset your
              password.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email')}
                  className={`${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email.message}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full  bg-[#6A5CA3] hover:bg-[#6A5CA3]/90"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Email'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordPage
