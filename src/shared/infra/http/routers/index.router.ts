import express from 'express'
import { clientRouter } from '../../../../modules/clients/infra/http/routers/client.router'
import { loanRouter } from '../../../../modules/loans/infra/http/routers/loan.router'

const router = express.Router()

router.use('/clients', clientRouter)
router.use('/loans', loanRouter)

export { router }
