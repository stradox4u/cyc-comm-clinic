import jwt from 'jsonwebtoken'
import config from '../../config/config.js'
import {
  AuthTokenType,
  UserType,
  type AuthTokenPayload,
  type AuthTokenResponse,
} from '../../types/index.js'
import type { ProviderRoleTitle } from '@prisma/client'

const generateToken = (
  payload: AuthTokenPayload,
  secret: string,
  expiresIn: number
) => {
  return jwt.sign(payload, secret, { expiresIn })
}

const generateAuthTokens = (
  userId: string,
  userType: UserType,
  providerRoleTitle?: ProviderRoleTitle
): AuthTokenResponse => {
  const accessTokenExpires =
    config.jwt.ACCESS_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000
  const refreshTokenExpires =
    config.jwt.REFRESH_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000

  const accessToken = generateToken(
    {
      sub: userId,
      tokenType: AuthTokenType.ACCESS,
      userType: userType,
      providerRoleTitle: providerRoleTitle,
    },
    config.jwt.ACCESS_TOKEN_SECRET,
    accessTokenExpires
  )

  const refreshToken = generateToken(
    {
      sub: userId,
      tokenType: AuthTokenType.REFRESH,
      userType: userType,
      providerRoleTitle: providerRoleTitle,
    },
    config.jwt.REFRESH_TOKEN_SECRET,
    refreshTokenExpires
  )

  return {
    access: { token: accessToken, expires: accessTokenExpires },
    refresh: { token: refreshToken, expires: refreshTokenExpires },
  }
}

const cookieConfig = (maxAge: number) => ({
  httpOnly: true,
  secure: true,
  sameSite: 'none' as 'none',
  maxAge: maxAge,
})

export { generateAuthTokens, cookieConfig }
