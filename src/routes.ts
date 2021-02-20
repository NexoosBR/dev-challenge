import express from 'express'
import { celebrate, Segments } from 'celebrate'
import { createCompanyController } from './use-cases/create-company'
import { createCreditRequestController } from './use-cases/create-credit-request'
import { loanOfferController } from './use-cases/loan-offer'
import { makeLoanController } from './use-cases/make-loan'
import { createCompanySchema } from './use-cases/create-company/create-company.schema'
import { createCreditRequestSchema } from './use-cases/create-credit-request/create-credit-request.schema'
import { makeLoanSchema } from './use-cases/make-loan/make-loan.schema'
import { LoanOfferSchema } from './use-cases/loan-offer/loan-offer.schema'

const router = express.Router()

router.post('/v1/create-company',
  celebrate({
    [Segments.BODY]: createCompanySchema
  }), (request, response) => {
    return createCompanyController.handle(request, response)
  })

router.post('/v1/create-credit-request', celebrate({
  [Segments.BODY]: createCreditRequestSchema
}), (request, response) => {
  return createCreditRequestController.handle(request, response)
})

router.get('/v1/loan-offer/:creditRequestId', celebrate({
  [Segments.PARAMS]: LoanOfferSchema
}), (request, response) => {
  return loanOfferController.handle(request, response)
})

router.post('/v1/make-loan', celebrate({
  [Segments.BODY]: makeLoanSchema
}), (request, response) => {
  return makeLoanController.handle(request, response)
})

export { router }
