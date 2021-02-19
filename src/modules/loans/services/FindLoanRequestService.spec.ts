import AppError from '@shared/errors/AppError';
import FakeLoanRequestsRepository from '../repositories/fakes/FakeLoanRequestsRepository';
import FakeLoanRequestStatusRepository from '../repositories/fakes/FakeLoanRequestStatusRepository';
import FindLoanRequestService from './FindLoanRequestService';

let fakeLoanRequestsRepository: FakeLoanRequestsRepository;
let fakeLoanRequestStatusRepository: FakeLoanRequestStatusRepository;

let findLoanRequest: FindLoanRequestService;

describe('FindLoanRequestService', () => {
  beforeEach(() => {
    fakeLoanRequestsRepository = new FakeLoanRequestsRepository();
    fakeLoanRequestStatusRepository = new FakeLoanRequestStatusRepository();

    findLoanRequest = new FindLoanRequestService(fakeLoanRequestsRepository);
  });

  it("should return a loan's request from repository with provided ID", async () => {
    const pendingStatus = await fakeLoanRequestStatusRepository.findByStatus(
      'pending',
    );

    if (!pendingStatus) throw new Error('Pending status not found');

    const registeredLoanRequester = await fakeLoanRequestsRepository.createAndSave(
      {
        requesterId: 'requester-id',
        loanRequestStatusId: pendingStatus.id,
        value: 10000,
      },
    );

    const loanRequest = await findLoanRequest.execute(
      registeredLoanRequester.id,
    );

    expect(loanRequest.id).toEqual(registeredLoanRequester.id);
  });

  it("should return an error message if loan's request was not found", async () => {
    await expect(
      findLoanRequest.execute('any-inexistent-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
