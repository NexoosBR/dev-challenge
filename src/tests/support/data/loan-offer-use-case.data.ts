import { uuid } from 'uuidv4'
import { CreditRequestModel } from '../../../models/credit-request.model'
import { LoanModel } from '../../../models/loan.model'
import { StatusCreditRequest, StatusLoan } from '../../../services/utils/enum'
import { FormattedLoan } from '../../../services/utils/interface'

export const creditRequestId = uuid()

export const creditRequestFound: CreditRequestModel = {
  creditRequestId: creditRequestId,
  companyId: uuid(),
  value: 100000,
  status: StatusCreditRequest.APPROVED
}

const numberOfInstallments = (creditRequestFound.value >= 15000 && creditRequestFound.value <= 250000) ? 12 : 24

const interestRate = (creditRequestFound.value >= 15000 && creditRequestFound.value <= 500000) ? 0.02 : 0.015

const installmentValue = creditRequestFound.value * ((((1 + interestRate) ** numberOfInstallments) * interestRate) / (((1 + interestRate) ** numberOfInstallments) - 1))

const finalValue = installmentValue * numberOfInstallments

export const savedLoan: LoanModel = {
  creditRequestId: creditRequestFound.creditRequestId as string,
  finalValue: finalValue,
  interestRate: interestRate,
  numberOfInstallments: numberOfInstallments,
  installmentValue: installmentValue,
  status: StatusLoan.PENDING
}

export const formattedLoan: FormattedLoan = {
  loadId: savedLoan.loanId as string,
  loanValue: new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(creditRequestFound.value),
  finalValue: new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(finalValue),
  interestRate: `${interestRate * 100}%`,
  numberOfInstallments: numberOfInstallments,
  installmentValue: new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(installmentValue)
}
