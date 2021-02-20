import { CompanyRepository } from '../../repositories/implementations/company.repository'
import { CreditRequestRepository } from '../../repositories/implementations/credit-request.repository'
import { CreateCreditRequestController } from './create-credit-request.controller'
import { CreateCreditRequestUseCase } from './create-credit-request.use-case'

const creditRequestRepository = new CreditRequestRepository()

const companyRepository = new CompanyRepository()

const createCreditRequestUseCase = new CreateCreditRequestUseCase(
  creditRequestRepository,
  companyRepository
)

const createCreditRequestController = new CreateCreditRequestController(
  createCreditRequestUseCase
)

export { createCreditRequestController }
