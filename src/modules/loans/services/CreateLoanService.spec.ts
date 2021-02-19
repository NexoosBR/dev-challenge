import Requester from '@modules/requesters/infra/typeorm/entities/Requester';
import AppError from '@shared/errors/AppError';
import FakeRequestersRepository from '@modules/requesters/repositories/fakes/FakeRequestersRepository';
import FakeLoanRequestsRepository from '../repositories/fakes/FakeLoanRequestsRepository';
import FakeLoanRequestStatusRepository from '../repositories/fakes/FakeLoanRequestStatusRepository';
import FakeLoansRepository from '../repositories/fakes/FakeLoansRepository';
import CreateLoanService from './CreateLoanService';
import LoanRequest from '../infra/typeorm/entities/LoanRequest';

let fakeLoanRequestsRepository: FakeLoanRequestsRepository;
let fakeLoansRepository: FakeLoansRepository;
let fakeRequestersRepository: FakeRequestersRepository;
let fakeLoanRequestStatusRepository: FakeLoanRequestStatusRepository;

let createLoan: CreateLoanService;

let requester: Requester;
let loanRequest: LoanRequest;

describe('CreateLoanService', () => {
  beforeEach(async () => {
    fakeLoanRequestsRepository = new FakeLoanRequestsRepository();
    fakeLoansRepository = new FakeLoansRepository();
    fakeRequestersRepository = new FakeRequestersRepository();
    fakeLoanRequestStatusRepository = new FakeLoanRequestStatusRepository();

    requester = await fakeRequestersRepository.createAndSave({
      addresses: [],
      cnpj: '23265773000103',
      companyName: 'Nexoos',
      phones: [],
    });

    const pendingStatus = await fakeLoanRequestStatusRepository.findByStatus(
      'pending',
    );

    if (!pendingStatus) throw new Error('Pending status not found');

    loanRequest = await fakeLoanRequestsRepository.createAndSave({
      requesterId: requester.id,
      value: 100000,
      loanRequestStatusId: pendingStatus.id,
    });

    createLoan = new CreateLoanService(
      fakeLoanRequestsRepository,
      fakeLoansRepository,
    );
  });

  it('should be able to create a new loan with installments accordingly to term provided', async () => {
    const loan = await createLoan.execute({
      expirationDay: 5,
      interestRate: 1.5,
      loanRequestId: loanRequest.id,
      term: 12,
    });

    expect(loan).toHaveProperty('id');
    expect(loan.loanInstallments).toHaveLength(loan.term);
  });

  it("should return value = 9167.999290622945 in loan installment's value with value = 100000, term = 12 and interest rate = 1.5", async () => {
    const loan = await createLoan.execute({
      expirationDay: 5,
      interestRate: 1.5,
      loanRequestId: loanRequest.id,
      term: 12,
    });

    expect(loan.loanInstallments[0].value).toBe(9167.999290622945);
  });

  it("should not be able to create a new loan if loan's request is not registered", async () => {
    await expect(
      createLoan.execute({
        expirationDay: 5,
        interestRate: 1.5,
        loanRequestId: 'inexistent-loan-request-id',
        term: 12,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to calculate if loan's request value is less or equal 0", async () => {
    const pendingStatus = await fakeLoanRequestStatusRepository.findByStatus(
      'pending',
    );

    if (!pendingStatus) throw new Error('Pending status not found');

    loanRequest = await fakeLoanRequestsRepository.createAndSave({
      requesterId: requester.id,
      value: 0,
      loanRequestStatusId: pendingStatus.id,
    });

    await expect(
      createLoan.execute({
        expirationDay: 5,
        interestRate: 1.5,
        loanRequestId: loanRequest.id,
        term: 12,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to calculate if term is less than 1', async () => {
    await expect(
      createLoan.execute({
        expirationDay: 5,
        interestRate: 1.5,
        loanRequestId: loanRequest.id,
        term: 0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to calculate if interest rate is less or equal 0', async () => {
    await expect(
      createLoan.execute({
        expirationDay: 5,
        interestRate: 0,
        loanRequestId: loanRequest.id,
        term: 12,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
