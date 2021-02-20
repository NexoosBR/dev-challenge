import { ILoanDTO } from '../../../../../modules/loans/dtos/loan.dto'
import { Loan } from '../../../../../modules/loans/infra/typeorm/models/loan.model'
import { ILoanRepository } from '../../../../../modules/loans/interfaces/loan.interface'
import { getRepository } from 'typeorm'

class LoanRepository implements ILoanRepository {
  async save (loan: ILoanDTO, ormRepository = getRepository(Loan)): Promise<Loan> {
    return ormRepository.save(loan)
  }

  async find (ormRepository = getRepository(Loan)): Promise<Loan[]> {
    return ormRepository.find()
  }

  async findById (id: string, ormRepository = getRepository(Loan)): Promise<Loan | undefined> {
    const loan = await ormRepository.findOne({ where: { id } })

    return loan
  }
}

export { LoanRepository }
