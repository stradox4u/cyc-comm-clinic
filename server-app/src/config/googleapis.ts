import { google } from 'googleapis'
import config from './config.js'

const oauth2Client = new google.auth.OAuth2(
  config.google.CLIENT_ID,
  config.google.CLIENT_SECRET,
  `${config.SERVER_URL}/api/auth/google/callback`
)

const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
    prompt: 'consent',
  })
}
const getTokens = async (code: string) => {
  const res = await oauth2Client.getToken(code)
  console.log(res)
  return res.tokens
}

export default {
  oauth2Client,
  getAuthUrl,
  getTokens,
}
