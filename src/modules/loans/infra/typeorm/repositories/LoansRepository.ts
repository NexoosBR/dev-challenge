import ICreateLoanDTO from '@modules/loans/dtos/ICreateLoanDTO';
import ILoansRepository from '@modules/loans/repositories/ILoansRepository';
import { getRepository, Repository } from 'typeorm';
import Loan from '../entities/Loan';

class LoansRepository implements ILoansRepository {
  private ormRepository: Repository<Loan>;

  constructor() {
    this.ormRepository = getRepository(Loan);
  }

  public async createAndSave(loanData: ICreateLoanDTO): Promise<Loan> {
    const loan = this.ormRepository.create(loanData);

    await this.ormRepository.save(loan);

    return loan;
  }

  public async findById(loanId: string): Promise<Loan | undefined> {
    const loan = await this.ormRepository.findOne({
      relations: ['loanInstallments'],
      where: {
        id: loanId,
      },
    });

    return loan;
  }
}

export default LoansRepository;
