import nodemailer from 'nodemailer'
import config from './config.js'

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: config.email.USER,
    pass: config.email.PASS,
  },
})

const sendEmail = (mail: Record<string, any>) => {
  const mailOptions = {
    from: `${config.APP_NAME} <info@chc.org>`,
    to: mail.to,
    subject: mail.subject,
    html: `
          <div style="margin: 20px; background: #fff; border-radius: 10px; padding: 20px 10px; box-shadow: 0px 4px 10px gray">
              ${mail.html}
          </div>
        `,
  }

  return transporter.sendMail(mailOptions)
}

export { sendEmail }
