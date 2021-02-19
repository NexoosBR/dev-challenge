import CreateLoanRequestService from '@modules/loans/services/CreateLoanRequestService';
import RequestersRepository from '@modules/requesters/infra/typeorm/repositories/RequesterRepository';
import { Request, Response } from 'express';
import LoanRequestsRepository from '../../typeorm/repositories/LoanRequestsRepository';
import LoanRequestStatusRepository from '../../typeorm/repositories/LoanRequestStatusRepository';

export default class LoanRequestsController {
  public async find(request: Request, response: Response): Promise<Response> {
    const { loanRequestId } = request.params;

    const loanRequestsRepository = new LoanRequestsRepository();

    const loanRequest = await loanRequestsRepository.findById(loanRequestId);

    return response.json(loanRequest);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { value, requesterId } = request.body;

    const requestersRepository = new RequestersRepository();
    const loanRequestsRepository = new LoanRequestsRepository();
    const loanRequestStatusRepository = new LoanRequestStatusRepository();

    const createLoanRequest = new CreateLoanRequestService(
      requestersRepository,
      loanRequestsRepository,
      loanRequestStatusRepository,
    );

    const loanRequest = await createLoanRequest.execute({ value, requesterId });

    return response.json(loanRequest);
  }
}
