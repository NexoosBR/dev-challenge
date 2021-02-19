import Requester from '@modules/requesters/infra/typeorm/entities/Requester';
import AppError from '@shared/errors/AppError';
import FakeRequestersRepository from '@modules/requesters/repositories/fakes/FakeRequestersRepository';
import FakeLoanRequestsRepository from '../repositories/fakes/FakeLoanRequestsRepository';
import FakeLoanRequestStatusRepository from '../repositories/fakes/FakeLoanRequestStatusRepository';
import CreateLoanRequestService from './CreateLoanRequestService';

let fakeRequestersRepository: FakeRequestersRepository;
let fakeLoanRequestsRepository: FakeLoanRequestsRepository;
let fakeLoanRequestStatusRepository: FakeLoanRequestStatusRepository;

let createLoanRequest: CreateLoanRequestService;

let requester: Requester;

describe('CreateLoanRequestService', () => {
  beforeEach(async () => {
    fakeRequestersRepository = new FakeRequestersRepository();
    fakeLoanRequestsRepository = new FakeLoanRequestsRepository();
    fakeLoanRequestStatusRepository = new FakeLoanRequestStatusRepository();

    requester = await fakeRequestersRepository.createAndSave({
      addresses: [],
      cnpj: '23265773000103',
      companyName: 'Nexoos',
      phones: [],
    });

    createLoanRequest = new CreateLoanRequestService(
      fakeRequestersRepository,
      fakeLoanRequestsRepository,
      fakeLoanRequestStatusRepository,
    );
  });

  it('should be able to create a new loan request', async () => {
    const loanRequest = await createLoanRequest.execute({
      requesterId: requester.id,
      value: 100000.0,
    });

    expect(loanRequest).toHaveProperty('id');
  });

  it('should not be able to create a new loan request with value less than 15000', async () => {
    await expect(
      createLoanRequest.execute({
        requesterId: requester.id,
        value: 14999.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new loan request with value greater than 18000000', async () => {
    await expect(
      createLoanRequest.execute({
        requesterId: requester.id,
        value: 18000001.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new loan request with inexistent requester', async () => {
    await expect(
      createLoanRequest.execute({
        requesterId: 'inexistent-requester',
        value: 18000000.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
