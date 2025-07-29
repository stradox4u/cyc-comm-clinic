import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import config from './config/config.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import { appLogger } from './middlewares/logger.js'
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import { authRoute, googleAuthRoute } from './modules/auth/index.js'
import { insuranceProviderRoute } from './modules/insuranceProvider/index.js'

const app = express()

app.use(appLogger)

app.use(
  cors({
    origin: config.ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders:
      'Accept, Accept-Language, X-Requested-With, Content-Language, Content-Type, Origin, Authorization',
    optionsSuccessStatus: 200,
    credentials: true,
  })
)

app.use(helmet())

app.use(express.json())

const PgSession = connectPgSimple(session)
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: config.SESSION_EXPIRATION_HOURS * 60 * 60 * 1000,
    },
    store: new PgSession({
      conString: config.DATABASE_URL,
      createTableIfMissing: true,
    }),
  })
)

app.use('/api/auth', authRoute)
app.use('/api/auth/google', googleAuthRoute)
app.use('/api/insurance-providers', insuranceProviderRoute)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
