import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import config from './config/config.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import { appLogger } from './middlewares/logger.js'
import { authRoute } from './modules/auth/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../', '../', '.env') })

const app = express()

app.use(appLogger)

app.use(
  cors({
    origin: config.ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders:
      'Accept, Accept-Language, X-Requested-With, Content-Language, Content-Type, Origin, Authorization, x-paystack-signature, x-forwarded-for',
    optionsSuccessStatus: 200,
    credentials: true,
  })
)

app.use(helmet())

app.use(express.json())
app.use(cookieParser())

//======= Routes ========//
app.get('/', (req, res) => {
  res.json({ message: 'Server running' })
})
app.use('/api/auth', authRoute)

//=======Error Handlers=======//
app.use(notFoundHandler)
app.use(errorHandler)

//=======........========//

export default app
