import { Resend, type CreateEmailOptions } from 'resend'
import config from './config.js'

const resend = new Resend(config.RESEND_API_KEY)

type MailPayload = {
  to: string
  subject: string
  html: string
  scheduledAt?: string
}

const sendEmail = (mail: MailPayload) => {
  const mailOptions: CreateEmailOptions = {
    from: `${config.APP_NAME} <onboarding@resend.dev>`,
    to: ['delivered@resend.dev'],
    subject: mail.subject,
    html: `
            <div style="margin: 20px; background: #fff; border-radius: 10px; padding: 20px 10px; box-shadow: 0px 4px 10px gray">
              ${mail.html}
            </div>
          `,
  }

  return resend.emails.send(mailOptions)
}

export { sendEmail }
