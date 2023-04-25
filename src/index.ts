import express, { type Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import nocache from 'nocache'

import indexRoute from '@Routes/indexRoute'

dotenv.config()

const app: Application = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(helmet())
app.use(helmet.frameguard({ action: 'deny' }))
app.use(nocache())
app.use(cors())

// Routes
app.use('/api/v1', indexRoute)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`)
})
