import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLoanRequestService from '@modules/loans/services/CreateLoanRequestService';
import LoanRequestsRepository from '../../typeorm/repositories/LoanRequestsRepository';

export default class LoanRequestsController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { loanRequestId } = request.params;

    const loanRequestsRepository = new LoanRequestsRepository();

    const loanRequest = await loanRequestsRepository.findById(loanRequestId);

    return response.json(loanRequest);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { value, requesterId } = request.body;

    const createLoanRequest = container.resolve(CreateLoanRequestService);

    const loanRequest = await createLoanRequest.execute({ value, requesterId });

    return response.json(loanRequest);
  }
}
