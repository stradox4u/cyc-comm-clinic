import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { UserType, type UserPayload } from '../types/index.js'
import providerService from '../modules/provider/provider.service.js'
import patientService from '../modules/patient/patient.service.js'

passport.serializeUser((userPayload, done) => {
  done(null, userPayload)
})

passport.deserializeUser(async (userPayload: UserPayload, done) => {
  try {
    if (userPayload.type === UserType.PATIENT) {
      await patientService.findPatient({ id: userPayload.id })
    } else if (userPayload.type === UserType.PROVIDER) {
      await providerService.findProvider({ id: userPayload.id })
    }

    return done(null, userPayload)
  } catch (err) {
    done(err, null)
  }
})

passport.use(
  'patient-local',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        let user = await patientService.findPatient({ email: email })
        if (!user) return done(null, false, { message: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
          return done(null, false, { message: 'Invalid credentials' })

        const userPayload: UserPayload = {
          id: user.id,
          type: UserType.PATIENT,
        }

        return done(null, userPayload)
      } catch (err) {
        return done(err)
      }
    }
  )
)

passport.use(
  'provider-local',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        let user = await providerService.findProvider({ email: email })
        if (!user) return done(null, false, { message: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
          return done(null, false, { message: 'Invalid credentials' })

        const userPayload: UserPayload = {
          id: user.id,
          type: UserType.PROVIDER,
          roleTitle: user.role_title,
        }

        return done(null, userPayload)
      } catch (err) {
        return done(err)
      }
    }
  )
)

export default passport
