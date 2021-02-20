import { CreditRequestRepository } from '../../repositories/implementations/credit-request.repository'
import { LoanRepository } from '../../repositories/implementations/loan.repository'
import { LoanOfferController } from './loan-offer.controller'
import { LoanOfferUseCase } from './loan-offer.use-case'

const loanRepository = new LoanRepository()

const creditRequestRepository = new CreditRequestRepository()

const loanOfferUseCase = new LoanOfferUseCase(
  loanRepository,
  creditRequestRepository
)

const loanOfferController = new LoanOfferController(
  loanOfferUseCase
)

export { loanOfferController }
