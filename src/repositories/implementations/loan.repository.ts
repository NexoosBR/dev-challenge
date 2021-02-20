import { getRepository } from 'typeorm'
import { LoanModel } from '../../models/loan.model'
import { ILoanRepository } from '../i-loan.repository'

export class LoanRepository implements ILoanRepository {
  async save (loan: LoanModel, repository = getRepository(LoanModel)): Promise<LoanModel> {
    const savedLoan = await repository.save(loan)
    return savedLoan
  }

  async findOneById (loanId: string, repository = getRepository(LoanModel)): Promise<LoanModel | undefined> {
    const loan = await repository.findOne({
      where: { loanId: loanId }
    })
    return loan
  }

  async findOneByCreditRequestId (creditRequestId: string, repository = getRepository(LoanModel)): Promise<LoanModel | undefined> {
    const loan = await repository.findOne({
      where: { creditRequestId: creditRequestId }
    })
    return loan
  }

  async update (loan: Partial<LoanModel>, repository = getRepository(LoanModel)): Promise<LoanModel> {
    const updatedLoan = await repository.save(loan)

    return updatedLoan
  }
}
