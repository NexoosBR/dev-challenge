import ICreateLoanRequestDTO from '@modules/loans/dtos/ICreateLoanRequestDTO';
import ILoanRequestsRepository from '@modules/loans/repositories/ILoanRequestsRepository';
import { getRepository, Repository } from 'typeorm';
import LoanRequest from '../entities/LoanRequest';

class LoanRequestsRepository implements ILoanRequestsRepository {
  private ormRepository: Repository<LoanRequest>;

  constructor() {
    this.ormRepository = getRepository(LoanRequest);
  }

  public async createAndSave(
    loanRequestData: ICreateLoanRequestDTO,
  ): Promise<LoanRequest> {
    const loanRequest = this.ormRepository.create(loanRequestData);

    await this.ormRepository.save(loanRequest);

    return loanRequest;
  }

  public async findById(loanId: string): Promise<LoanRequest | undefined> {
    const loanRequest = await this.ormRepository.findOne({
      relations: ['loanRequestStatus'],
      where: {
        id: loanId,
      },
    });

    return loanRequest;
  }
}

export default LoanRequestsRepository;
