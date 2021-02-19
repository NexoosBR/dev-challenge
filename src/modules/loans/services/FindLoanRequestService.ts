import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import LoanRequest from '../infra/typeorm/entities/LoanRequest';
import ILoanRequestsRepository from '../repositories/ILoanRequestsRepository';

@injectable()
class FindLoanRequestService {
  constructor(
    @inject('LoanRequestsRepository')
    private loanRequestsRepository: ILoanRequestsRepository,
  ) {}

  public async execute(loanRequestId: string): Promise<LoanRequest> {
    const loanRequest = await this.loanRequestsRepository.findById(
      loanRequestId,
    );

    if (!loanRequest) throw new AppError("Loan's request was not found", 404);

    return loanRequest;
  }
}

export default FindLoanRequestService;
