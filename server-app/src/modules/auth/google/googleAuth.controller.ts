import type { Request, Response } from 'express'
import catchAsync from '../../../utils/catchAsync.js'
import googleapis from '../../../config/googleapis.js'
import authService from './googleAuth.service.js'
import config from '../../../config/config.js'
import logger from '../../../middlewares/logger.js'

const getAuthUrl = catchAsync((req, res) => {
  const authUrl = googleapis.getAuthUrl()

  res.status(200).json({
    success: true,
    data: authUrl,
    message: 'Redirect for authorization',
  })
})

const handleCallback = async (req: Request, res: Response) => {
  try {
    const patient_id = req.user!.id
    const { code } = req.query as any

    const tokens: {} = await googleapis.getTokens(code)

    await authService.updateorCreateCalendarToken(
      { patient_id },
      { patient_id, tokens }
    )

    res.redirect(`${config.ORIGIN_URL}/profile/calendar?auth=success`)
  } catch (err) {
    logger.error(`Error authenticating google calendar, ${err}`)
    res.redirect(`${config.ORIGIN_URL}/profile/calendar?auth=failed`)
  }
}

export default {
  getAuthUrl,
  handleCallback,
}
