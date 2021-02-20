import express, { NextFunction, Request, Response } from 'express'

import { AppError } from '../../errors/app.error'
import { router } from './routers/index.router'

const app = express()

app.use(express.json())

app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ status: 'error', message: err.message })
  }

  console.log(err)

  return response.status(500).json({ status: 'error', message: 'Erro interno do servidor.' })
})

export { app }
