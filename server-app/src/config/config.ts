const env = (variable: string): any => {
  return process.env[variable]
}

const config = {
  NODE_ENV: env('NODE_ENV'),
  PORT: env('PORT'),
  APP_NAME: env('APP_NAME'),
  ORIGIN_URL: env('ORIGIN_URL'),
  DATABASE_URL: env('DATABASE_URL'),
  SESSION_SECRET: env('SESSION_SECRET'),
  SESSION_EXPIRATION_HOURS: env('SESSION_EXPIRATION_HOURS'),
  RESEND_API_KEY: env('RESEND_API_KEY'),
  OTP_EXPIRATION_MINUTES: env('OTP_EXPIRATION_MINUTES'),
  email: {
    USER: env('EMAIL_USER'),
    PASS: env('EMAIL_PASS'),
  },
}

export default config
