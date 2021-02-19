import AppError from '@shared/errors/AppError';
import CalculateLoanInstallmentsService from './CalculateLoanInstallmentsService';

let calculateLoanInstallments: CalculateLoanInstallmentsService;

describe('CalculateLoanInstallmentsService', () => {
  beforeEach(() => {
    calculateLoanInstallments = new CalculateLoanInstallmentsService();
  });

  it('should return pmt = 9167.999290622945 with value = 100000, term = 12 and interest rate = 1.5', async () => {
    const value = 100000;
    const term = 12;
    const interestRate = 1.5;

    const pmt = await calculateLoanInstallments.execute({
      value,
      term,
      interestRate,
    });

    expect(pmt).toBe(9167.999290622945);
  });

  it('should not be able to calculate if value is less or equal 0', async () => {
    const value = 0;
    const term = 12;
    const interestRate = 1.5;

    await expect(
      calculateLoanInstallments.execute({
        value,
        term,
        interestRate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to calculate if term is less than 1', async () => {
    const value = 100000;
    const term = 0;
    const interestRate = 1.5;

    await expect(
      calculateLoanInstallments.execute({
        value,
        term,
        interestRate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to calculate if interest rate is less or equal 0', async () => {
    const value = 100000;
    const term = 12;
    const interestRate = 0;

    await expect(
      calculateLoanInstallments.execute({
        value,
        term,
        interestRate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
