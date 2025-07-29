const env = (variable: string): any => {
  const value = process.env[variable]

  if (!value) throw new Error(`${variable} not set in ENV`)

  return value
}

const config = {
  NODE_ENV: env('NODE_ENV'),
  PORT: env('PORT'),
  APP_NAME: env('APP_NAME'),
  ORIGIN_URL: env('ORIGIN_URL'),
  SERVER_URL: env('SERVER_URL'),
  DATABASE_URL: env('DATABASE_URL'),
  SESSION_SECRET: env('SESSION_SECRET'),
  SESSION_EXPIRATION_HOURS: env('SESSION_EXPIRATION_HOURS'),
  email: {
    USER: env('EMAIL_USER'),
    PASS: env('EMAIL_PASS'),
  },
  google: {
    CLIENT_ID: env('GOOGLE_CLIENT_ID'),
    CLIENT_SECRET: env('GOOGLE_CLIENT_SECRET'),
  },
}

export default config
