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

  public async findById(
    loanRequestId: string,
  ): Promise<LoanRequest | undefined> {
    const loanRequest = await this.ormRepository.findOne({
      relations: ['loanRequestStatus'],
      where: {
        id: loanRequestId,
      },
    });

    return loanRequest;
  }

  public async save(
    loanRequest: LoanRequest,
  ): Promise<LoanRequest | undefined> {
    if (!loanRequest.id) return undefined;

    const loanRequestFound = await this.ormRepository.findOne({
      where: {
        id: loanRequest.id,
      },
    });

    if (!loanRequest) return undefined;

    Object.assign(loanRequest, {
      createdAt: loanRequest.createdAt,
      updatedAt: new Date(),
    });

    await this.ormRepository.save(loanRequest);

    return loanRequestFound;
  }
}

export default LoanRequestsRepository;
