import { v4 as uuidv4 } from 'uuid';

import LoanRequestStatus from '@modules/loans/infra/typeorm/entities/LoanRequestStatus';
import ILoanRequestStatusRepository from '../ILoanRequestStatusRepository';

class FakeLoanRequestStatusRepository implements ILoanRequestStatusRepository {
  private loanRequestStatus: LoanRequestStatus[] = [];

  constructor(startWithSeeds = true) {
    if (!startWithSeeds) return;

    const defaultParams = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const pendingStatus = new LoanRequestStatus();
    Object.assign(pendingStatus, {
      ...defaultParams,
      id: uuidv4(),
      status: 'pending',
      description: 'Loan request is pending of approval.',
    });
    this.loanRequestStatus.push(pendingStatus);

    const approvedStauts = new LoanRequestStatus();
    Object.assign(approvedStauts, {
      ...defaultParams,
      id: uuidv4(),
      status: 'approved',
      description: 'Loan request is approved.',
    });
    this.loanRequestStatus.push(approvedStauts);

    const disapprovedStatus = new LoanRequestStatus();
    Object.assign(disapprovedStatus, {
      ...defaultParams,
      id: uuidv4(),
      status: 'disaapproved',
      description: 'Loan request is disaapproved.',
    });
    this.loanRequestStatus.push(disapprovedStatus);
  }

  public async findByStatus(
    status: string,
  ): Promise<LoanRequestStatus | undefined> {
    const statusFound = this.loanRequestStatus.find(
      loanRequestStatus => loanRequestStatus.status === status,
    );

    return statusFound;
  }
}

export default FakeLoanRequestStatusRepository;
