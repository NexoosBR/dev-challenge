import { InstallmentRepository } from '../../repositories/implementations/installment.repository'
import { LoanRepository } from '../../repositories/implementations/loan.repository'
import { MakeLoanController } from './make-loan.controller'
import { MakeLoanUseCase } from './make-loan.use-case'

const loanRepository = new LoanRepository()

const installmentRepository = new InstallmentRepository()

const makeLoanUseCase = new MakeLoanUseCase(
  loanRepository,
  installmentRepository
)

const makeLoanController = new MakeLoanController(
  makeLoanUseCase
)

export { makeLoanController }
