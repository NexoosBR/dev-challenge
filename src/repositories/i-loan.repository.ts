import { LoanModel } from '../models/loan.model'

export interface ILoanRepository {
    save(loan: LoanModel): Promise<LoanModel>
    findOneById(loanId: string): Promise<LoanModel | undefined>
    findOneByCreditRequestId(creditRequestId: string): Promise<LoanModel | undefined>
    update(loan: Partial<LoanModel>): Promise<LoanModel>
}
