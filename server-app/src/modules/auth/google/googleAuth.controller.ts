import type { Request, Response } from 'express'
import catchAsync from '../../../utils/catchAsync.js'
import googleapis from '../../../config/googleapis.js'
import googleAuthService from './googleAuth.service.js'
import config from '../../../config/config.js'
import logger from '../../../middlewares/logger.js'
import patientService from '../../patient/patient.service.js'

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

    await googleAuthService.updateorCreateCalendarToken(
      { patient_id },
      { patient_id, tokens }
    )
    await patientService.updatePatient(
      { id: patient_id },
      { has_calendar_access: true }
    )

    res.redirect(`${config.ORIGIN_URL}/settings?calendar-auth=success`)
  } catch (err) {
    logger.error(`Error authenticating google calendar, ${err}`)
    res.redirect(`${config.ORIGIN_URL}/settings?calendar-auth=failed`)
  }
}

export default {
  getAuthUrl,
  handleCallback,
}
