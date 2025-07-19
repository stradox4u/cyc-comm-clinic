import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import config from './config/config.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import { appLogger } from './middlewares/logger.js'
import { authRoute } from './modules/auth/index.js'
import session from 'express-session'
import passport from './config/passport.js'
import connectPgSimple from 'connect-pg-simple'

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
      secure: true,
      httpOnly: true,
      maxAge: config.SESSION_EXPIRATION_HOURS * 60 * 60 * 1000,
    },
    store: new PgSession({
      conString: config.DATABASE_URL,
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoute)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
