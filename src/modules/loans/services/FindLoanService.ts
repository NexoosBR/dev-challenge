import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Loan from '../infra/typeorm/entities/Loan';
import ILoansRepository from '../repositories/ILoansRepository';

@injectable()
class FindLoanService {
  constructor(
    @inject('LoansRepository')
    private loansRepository: ILoansRepository,
  ) {}

  public async execute(loanId: string): Promise<Loan> {
    const loan = await this.loansRepository.findById(loanId);

    if (!loan) throw new AppError('Loan was not found', 404);

    return loan;
  }
}

export default FindLoanService;
