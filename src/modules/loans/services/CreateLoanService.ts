import { addMonths, setDate } from 'date-fns';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import LoanInstallment from '../infra/typeorm/entities/LoanInstallment';
import ILoanRequestsRepository from '../repositories/ILoanRequestsRepository';
import ILoansRepository from '../repositories/ILoansRepository';
import ILoanRequestStatusRepository from '../repositories/ILoanRequestStatusRepository';
import Loan from '../infra/typeorm/entities/Loan';

interface IRequest {
  expirationDay: 5 | 10 | 15 | 20;
  term: number;
  interestRate: number;
  loanRequestId: string;
}

@injectable()
class CreateLoanService {
  constructor(
    @inject('LoanRequestsRepository')
    private loanRequestsRepository: ILoanRequestsRepository,
    @inject('LoansRepository')
    private loansRepository: ILoansRepository,
    @inject('LoanRequestStatusRepository')
    private loanRequestStatusRepository: ILoanRequestStatusRepository,
  ) {}

  public async execute({
    expirationDay,
    term,
    interestRate,
    loanRequestId,
  }: IRequest): Promise<Loan> {
    /**
     * Validates loanRequest
     */
    const loanRequest = await this.loanRequestsRepository.findById(
      loanRequestId,
    );

    if (!loanRequest)
      throw new AppError('Loan request was not found to create new loan');

    const loanValue = loanRequest.value;

    /**
     * Validates loan's value
     */
    if (loanValue <= 0)
      throw new AppError("Loan's value must be greater than 0.");

    /**
     * Validates loan's term
     */
    if (term < 1) throw new AppError("Loan's term must be greater than 1.");

    /**
     * Validates loan's interest rate
     */
    if (interestRate <= 0)
      throw new AppError("Loan's interest rate must be greater than 0");

    /**
     * Validates if loan's request was already used
     */
    const checkLoanRequestUsed = await this.loansRepository.findByLoanRequestId(
      loanRequestId,
    );

    if (checkLoanRequestUsed)
      throw new AppError("Loan's request was already used in another loan.");

    const dividedInteresRate = interestRate / 100;

    const pmt =
      loanValue *
      (((1 + dividedInteresRate) ** term * dividedInteresRate) /
        ((1 + dividedInteresRate) ** term - 1));

    const currentDate = new Date();

    const loanInstallments: LoanInstallment[] = Array.from(
      { length: term },
      (_, index) => {
        const loanInstallment = new LoanInstallment();
        loanInstallment.value = pmt;
        loanInstallment.paid = false;
        loanInstallment.expirationDate = addMonths(
          setDate(currentDate, expirationDay),
          index + 1,
        );

        return loanInstallment;
      },
    );

    const totalLoanValue = loanInstallments
      .map(loanInstallment => loanInstallment.value)
      .reduce((total, next) => total + next);

    const loan = await this.loansRepository.createAndSave({
      value: loanValue,
      totalValue: totalLoanValue,
      expirationDay,
      interestRate,
      loanInstallments,
      loanRequestId,
      term,
    });

    // Updates Loan's request status
    const loanRequestStatus = await this.loanRequestStatusRepository.findByStatus(
      'approved',
    );

    if (!loanRequestStatus)
      throw new AppError('Approved status not found to update loan request.');

    loanRequest.loanRequestStatusId = loanRequestStatus.id;
    loanRequest.loanRequestStatus = loanRequestStatus;

    await this.loanRequestsRepository.save(loanRequest);

    return loan;
  }
}

export default CreateLoanService;
