import ILoanRequestStatusRepository from '@modules/loans/repositories/ILoanRequestStatusRepository';
import { getRepository, Repository } from 'typeorm';
import LoanRequestStatus from '../entities/LoanRequestStatus';

class LoanRequestStatusRepository implements ILoanRequestStatusRepository {
  private ormRepository: Repository<LoanRequestStatus>;

  constructor() {
    this.ormRepository = getRepository(LoanRequestStatus);
  }

  public async findByStatus(
    status: string,
  ): Promise<LoanRequestStatus | undefined> {
    const loanRequestStatus = await this.ormRepository.findOne({
      where: {
        status,
      },
    });

    return loanRequestStatus;
  }
}

export default LoanRequestStatusRepository;
