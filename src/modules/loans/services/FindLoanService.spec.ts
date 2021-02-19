import AppError from '@shared/errors/AppError';
import FakeLoansRepository from '../repositories/fakes/FakeLoansRepository';
import FindLoanService from './FindLoanService';

let fakeLoansRepository: FakeLoansRepository;

let findLoan: FindLoanService;

describe('FindLoanService', () => {
  beforeEach(() => {
    fakeLoansRepository = new FakeLoansRepository();

    findLoan = new FindLoanService(fakeLoansRepository);
  });

  it('should return a loan from repository with provided ID', async () => {
    const registeredLoan = await fakeLoansRepository.createAndSave({
      expirationDay: 5,
      interestRate: 1.5,
      loanRequestId: 'loan-request-id',
      term: 12,
      loanInstallments: [],
      totalValue: 1000000,
      value: 10000,
    });

    const loan = await findLoan.execute(registeredLoan.id);

    expect(loan.id).toEqual(registeredLoan.id);
  });

  it('should return an error message if loan was not found', async () => {
    await expect(findLoan.execute('any-inexistent-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
