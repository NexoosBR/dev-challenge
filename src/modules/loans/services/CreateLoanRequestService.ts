import IRequestersRepository from '@modules/requesters/repositories/IRequestersRepository';
import AppError from '@shared/errors/AppError';
import LoanRequest from '../infra/typeorm/entities/LoanRequest';
import ILoanRequestsRepository from '../repositories/ILoanRequestsRepository';
import ILoanRequestStatusRepository from '../repositories/ILoanRequestStatusRepository';

interface IRequest {
  value: number;
  requesterId: string;
}

class CreateLoanRequestService {
  constructor(
    private requestersRepository: IRequestersRepository,
    private loanRequestsRepository: ILoanRequestsRepository,
    private loanRequestStatusRepository: ILoanRequestStatusRepository,
  ) {}

  public async execute({ value, requesterId }: IRequest): Promise<LoanRequest> {
    /**
     * Validates loan's value
     */
    if (value < 15000 || value > 18000000)
      throw new AppError("Loan's value must be between 15,000 and 18,000,000.");

    /**
     * Validates requester
     */
    const requester = await this.requestersRepository.findById(requesterId);

    if (!requester) throw new AppError('Requester was not found.', 404);

    const loanRequestStatus = await this.loanRequestStatusRepository.findByStatus(
      'pending',
    );

    if (!loanRequestStatus)
      throw new AppError('Pending status not found to create loan request.');

    const loanRequest = await this.loanRequestsRepository.createAndSave({
      requesterId,
      value,
      loanRequestStatusId: loanRequestStatus.id,
    });

    return loanRequest;
  }
}

export default CreateLoanRequestService;
