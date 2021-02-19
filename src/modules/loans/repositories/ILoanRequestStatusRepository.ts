import LoanRequestStatus from '../infra/typeorm/entities/LoanRequestStatus';

export default interface ILoanRequestStatusRepository {
  findByStatus(status: string): Promise<LoanRequestStatus | undefined>;
}
