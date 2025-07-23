const env = (variable: string): any => {
  return process.env[variable]
}

const config = {
  NODE_ENV: env('NODE_ENV'),
  PORT: env('PORT'),
  ORIGIN_URL: env('ORIGIN_URL'),
  DATABASE_URL: env('DATABASE_URL'),
  jwt: {
    JWT_SECRET: env('JWT_SECRET'),
    ACCESS_TOKEN_SECRET: env('ACCESS_TOKEN_SECRET'),
    REFRESH_TOKEN_SECRET: env('REFRESH_TOKEN_SECRET'),
    ACCESS_TOKEN_EXPIRATION_HOURS: env('JWT_ACCESS_TOKEN_EXPIRATION_HOURS'),
    REFRESH_TOKEN_EXPIRATION_HOURS: env('JWT_REFRESH_TOKEN_EXPIRATION_HOURS'),
  },
}

export default config
