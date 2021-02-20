import dotenv from 'dotenv'

import express from 'express'
import { router } from './routes'
import cors, { CorsOptions } from 'cors'
import { TypeORMDataBaseSQL } from './services/infra/database/implementation/typeorm-database-sql'
import { errors as celebrateErrors } from 'celebrate'
dotenv.config()

const corsOptions: CorsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH'],
  origin: '*'
}

const app: express.Application = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(router)
app.use(celebrateErrors())

app.listen(process.env.PORT, () => { console.log('Listening on ' + process.env.PORT) })

async function initialize () {
  const database = new TypeORMDataBaseSQL()

  await database.connectDB()
}

initialize()
