import { AppError } from '../../../shared/errors/app.error'
import { Loan } from '../infra/typeorm/models/loan.model'
import { LoanRepository } from '../infra/typeorm/repositories/loan.repository'

class MakeALoanUseCase {
  constructor () { /** */ }

  async execute (loanId: string): Promise<Loan> {
    const ormRepository = new LoanRepository()

    const loanToConfirm = await ormRepository.findById(loanId)
    console.log(loanToConfirm)
    if (!loanToConfirm) throw new AppError('Loan not available', 404)

    if (loanToConfirm.status !== 'pending') throw new AppError('Loan not found, check if it has already been approved or disapproved.')

    return ormRepository.save({ ...loanToConfirm, status: 'approved' })
  }
}

export { MakeALoanUseCase }
