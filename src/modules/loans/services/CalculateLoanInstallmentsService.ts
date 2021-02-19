import AppError from '@shared/errors/AppError';

interface IRequest {
  value: number;
  term: number;
  interestRate: number;
}

class CalculateLoanInstallmentsService {
  public async execute({
    value,
    term,
    interestRate,
  }: // }: IRequest): Promise<ILoanInstallmentDTO[]> {
  IRequest): Promise<number> {
    /**
     * Validates loan's value
     */
    if (value <= 0) throw new AppError("Loan's value must be greater than 0.");

    /**
     * Validates loan's term
     */
    if (term < 1) throw new AppError("Loan's term must be greater than 1.");

    /**
     * Validates loan's interest rate
     */
    if (interestRate <= 0)
      throw new AppError("Loan's interest rate must be greater than 0");

    const dividedInteresRate = interestRate / 100;

    const pmt =
      value *
      (((1 + dividedInteresRate) ** term * dividedInteresRate) /
        ((1 + dividedInteresRate) ** term - 1));

    return pmt;
  }
}

export default CalculateLoanInstallmentsService;
