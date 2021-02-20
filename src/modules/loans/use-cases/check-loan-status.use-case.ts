import { AppError } from '../../../shared/errors/app.error'
import { Loan } from '../infra/typeorm/models/loan.model'
import { LoanRepository } from '../infra/typeorm/repositories/loan.repository'

class CheckLoanStatusUseCase {
  constructor () { /** */ }

  async execute (loanId: string): Promise<Loan> {
    const ormRepository = new LoanRepository()

    const loan = await ormRepository.findById(loanId)

    if (!loan) throw new AppError('Loan not available')

    console.log(loan)

    return loan
  }
}

export { CheckLoanStatusUseCase }
