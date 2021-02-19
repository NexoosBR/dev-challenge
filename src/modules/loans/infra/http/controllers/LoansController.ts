import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLoanService from '@modules/loans/services/CreateLoanService';
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

    const createLoan = container.resolve(CreateLoanService);

    const loan = await createLoan.execute({
      expirationDay,
      term,
      interestRate,
      loanRequestId,
    });

    return response.json(loan);
  }
}
