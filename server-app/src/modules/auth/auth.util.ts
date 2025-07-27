export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  const expiresInMs = 15 * 60 * 1000

  const now = new Date()
  const expires_at = new Date(now.getTime() + expiresInMs)

  return { otp, expires_at }
}
