import ICreateLoanRequestDTO from '../dtos/ICreateLoanRequestDTO';
import LoanRequest from '../infra/typeorm/entities/LoanRequest';

export default interface ILoanRequestsRepository {
  createAndSave(data: ICreateLoanRequestDTO): Promise<LoanRequest>;
  findById(id: string): Promise<LoanRequest | undefined>;
  save(loanRequest: LoanRequest): Promise<LoanRequest | undefined>;
}
