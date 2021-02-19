import ICreateLoanDTO from '../dtos/ICreateLoanDTO';
import Loan from '../infra/typeorm/entities/Loan';

export default interface ILoansRepository {
  createAndSave(loanData: ICreateLoanDTO): Promise<Loan>;
  findById(id: string): Promise<Loan | undefined>;
}
