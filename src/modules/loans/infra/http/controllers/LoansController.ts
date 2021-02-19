import CreateLoanService from '@modules/loans/services/CreateLoanService';
import { Request, Response } from 'express';
import LoanRequestsRepository from '../../typeorm/repositories/LoanRequestsRepository';
import LoansRepository from '../../typeorm/repositories/LoansRepository';

export default class LoansController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { loanId } = request.params;

    const loansRepository = new LoansRepository();

    const loan = await loansRepository.findById(loanId);

    return response.json(loan);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { expirationDay, term, interestRate, loanRequestId } = request.body;

    const loanRequestsRepository = new LoanRequestsRepository();
    const loansRepository = new LoansRepository();

    const createLoan = new CreateLoanService(
      loanRequestsRepository,
      loansRepository,
    );

    const loan = await createLoan.execute({
      expirationDay,
      term,
      interestRate,
      loanRequestId,
    });

    return response.json(loan);
  }
}
