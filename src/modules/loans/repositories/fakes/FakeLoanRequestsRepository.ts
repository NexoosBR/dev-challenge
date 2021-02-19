import { v4 as uuidv4 } from 'uuid';

import LoanRequest from '@modules/loans/infra/typeorm/entities/LoanRequest';
import ICreateLoanRequestDTO from '@modules/loans/dtos/ICreateLoanRequestDTO';
import ILoanRequestsRepository from '../ILoanRequestsRepository';

class FakeLoanRequestsRepository implements ILoanRequestsRepository {
  private loanRequests: LoanRequest[] = [];

  public async createAndSave({
    value,
    requesterId,
  }: ICreateLoanRequestDTO): Promise<LoanRequest> {
    const loanRequest = new LoanRequest();

    Object.assign(loanRequest, {
      id: uuidv4(),
      value,
      requesterId,
      loanRequestStatusId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.loanRequests.push(loanRequest);

    return loanRequest;
  }

  public async findById(
    loanRequestId: string,
  ): Promise<LoanRequest | undefined> {
    const loanRequestFound = this.loanRequests.find(
      loanRequest => loanRequest.id === loanRequestId,
    );

    return loanRequestFound;
  }
}

export default FakeLoanRequestsRepository;
