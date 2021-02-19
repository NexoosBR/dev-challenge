import { addMonths, setDate } from 'date-fns';
import { Request, Response } from 'express';
import CalculateLoanInstallmentsService from '@modules/loans/services/CalculateLoanInstallmentsService';
import LoanInstallment from '../../typeorm/entities/LoanInstallment';

export default class LoanSimulationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value, expirationDay, term, interestRate } = request.body;

    const calculateLoanInstallments = new CalculateLoanInstallmentsService();

    const pmt = await calculateLoanInstallments.execute({
      interestRate,
      term,
      value,
    });

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

    return response.json({
      value,
      totalLoanValue,
      expirationDay,
      term,
      interestRate,
      loanInstallments,
    });
  }
}
