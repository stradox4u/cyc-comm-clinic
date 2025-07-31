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
  email: {
    USER: env('EMAIL_USER'),
    PASS: env('EMAIL_PASS'),
  },
  AWS_ACCESS_KEY_ID: env('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: env('AWS_SECRET_ACCESS_KEY'),
  AWS_REGION: env('AWS_REGION'),
  S3_BUCKET_NAME: env('S3_BUCKET_NAME'),
}

export default config
