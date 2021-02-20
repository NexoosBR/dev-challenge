import { Loan } from '../../../modules/loans/infra/typeorm/models/loan.model'

import { ILoanDTO } from '../dtos/loan.dto'

interface ILoanRepository {
  save(loan: ILoanDTO): Promise<Loan>
  find(): Promise<Loan[]>
  findById(id: string): Promise<Loan | undefined>
}

export { ILoanRepository }
