import { uuid } from 'uuidv4'
import { InstallmentModel } from '../../../models/installment.model'
import { LoanModel } from '../../../models/loan.model'
import { StatusInstallment, StatusLoan } from '../../../services/utils/enum'
import { IMakeLoanRequestDTO } from '../../../use-cases/make-loan/make-loan.dto'

export const foundLoan: LoanModel = {
  loanId: uuid(),
  creditRequestId: uuid(),
  finalValue: 300000,
  interestRate: 0.02,
  numberOfInstallments: 12,
  installmentValue: 800,
  status: StatusLoan.PENDING
}

export const savedInstallment: InstallmentModel = {
  installmentId: uuid(),
  loanId: foundLoan.loanId as string,
  dueDate: new Date(),
  status: StatusInstallment.PENDING
}

export const loanIdObject: IMakeLoanRequestDTO = {
  loanId: foundLoan.loanId as string
}
