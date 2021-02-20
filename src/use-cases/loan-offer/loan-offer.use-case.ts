import { StatusLoan } from '../../services/utils/enum'
import { FormattedLoan } from '../../services/utils/interface'
import { LoanModel } from '../../models/loan.model'
import { CreditRequestRepository } from '../../repositories/implementations/credit-request.repository'
import { LoanRepository } from '../../repositories/implementations/loan.repository'
import { CommonError } from '../../services/errors/common-error'

export class LoanOfferUseCase {
  constructor (
        private loanRepository: LoanRepository,
        private creditRequestRepository: CreditRequestRepository
  ) {}

  async execute (creditRequestId: string): Promise<FormattedLoan> {
    const creditRequest = await this.creditRequestRepository.findOne(creditRequestId)

    if (!creditRequest) { throw new CommonError('Sorry but we did not find this credit request in our system') }

    const loanExist = await this.loanRepository.findOneByCreditRequestId(creditRequest.creditRequestId as string)

    if (loanExist) { throw new CommonError('Sorry but we already have a loan offer for this credit request') }

    const numberOfInstallments = (creditRequest.value >= 15000 && creditRequest.value <= 250000) ? 12 : 24

    const interestRate = (creditRequest.value >= 15000 && creditRequest.value <= 500000) ? 0.02 : 0.015

    const installmentValue = creditRequest.value * ((((1 + interestRate) ** numberOfInstallments) * interestRate) / (((1 + interestRate) ** numberOfInstallments) - 1))

    const finalValue = installmentValue * numberOfInstallments

    const loan: LoanModel = {
      creditRequestId: creditRequest.creditRequestId as string,
      finalValue: parseFloat(finalValue.toFixed(2)),
      interestRate: interestRate,
      numberOfInstallments: numberOfInstallments,
      installmentValue: parseFloat(installmentValue.toFixed(2)),
      status: StatusLoan.PENDING
    }

    const savedLoan = await this.loanRepository.save(loan)

    const formattedLoan: FormattedLoan = {
      loadId: savedLoan.loanId as string,
      loanValue: new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(creditRequest.value),
      finalValue: new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(finalValue),
      interestRate: `${interestRate * 100}%`,
      numberOfInstallments: numberOfInstallments,
      installmentValue: new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(installmentValue)
    }

    return formattedLoan
  }
}
