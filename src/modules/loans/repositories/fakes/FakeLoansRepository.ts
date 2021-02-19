import { v4 as uuidv4 } from 'uuid';

import ICreateLoanDTO from '@modules/loans/dtos/ICreateLoanDTO';
import Loan from '@modules/loans/infra/typeorm/entities/Loan';
import ILoansRepository from '../ILoansRepository';

class FakeLoansRepository implements ILoansRepository {
  private loans: Loan[] = [];

  public async createAndSave({
    value,
    totalValue,
    term,
    interestRate,
    expirationDay,
    loanInstallments,
    loanRequestId,
  }: ICreateLoanDTO): Promise<Loan> {
    const loan = new Loan();

    Object.assign(loan, {
      id: uuidv4(),
      value,
      totalValue,
      term,
      interestRate,
      expirationDay,
      loanInstallments,
      loanRequestId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.loans.push(loan);

    return loan;
  }

  public async findById(loanId: string): Promise<Loan | undefined> {
    const loanFound = this.loans.find(loan => loan.id === loanId);

    return loanFound;
  }
}

export default FakeLoansRepository;
