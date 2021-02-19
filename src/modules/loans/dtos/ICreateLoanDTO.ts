import LoanInstallment from '../infra/typeorm/entities/LoanInstallment';

export default interface ICreateLoanDTO {
  value: number;
  totalValue: number;
  term: number;
  interestRate: number;
  expirationDay: number;
  loanRequestId: string;
  loanInstallments: LoanInstallment[];
}
