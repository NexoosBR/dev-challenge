import { AppError } from '../../../shared/errors/app.error'
import { ILoanDTO } from '../../../modules/loans/dtos/loan.dto'
import { ILoanRepository } from '../../../modules/loans/interfaces/loan.interface'

class CreditRequestUseCase {
  constructor (private ormRepository: ILoanRepository) { /** */ }

  async execute (loan: ILoanDTO): Promise<{ creditRequestId: string }> {
    loan.creditRequestValue = loan.creditRequestValue.replace(/[^0-9]/gi, '')

    const creditRequestValue = parseInt(loan.creditRequestValue, 10)

    if ((creditRequestValue < 15_000) && (creditRequestValue > 18_000_000)) throw new AppError('The amount requested must be between R$ 15.000,00 and R$ 18.000.000,00')

    const interestCalculation = (value: number) => {
      if (value <= 500_000) return { interestRate: 0.02, installments: 12 }

      if (value <= 5_000_000) return { interestRate: 0.015, installments: 24 }

      return { interestRate: 0.01, installments: 36 }
    }

    const { interestRate, installments } = interestCalculation(creditRequestValue)

    const loanValue = (creditRequestValue * ((((1 + interestRate) ** installments) * interestRate) / (((1 + interestRate) ** installments) - 1))).toString()

    const loanToSave = { ...loan, loanValue, interestRate, installments }

    const result = await this.ormRepository.save(loanToSave)

    return { creditRequestId: result.id as string }
  }
}

export { CreditRequestUseCase }
