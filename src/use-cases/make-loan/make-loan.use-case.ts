import { InstallmentModel } from '../../models/installment.model'
import { InstallmentRepository } from '../../repositories/implementations/installment.repository'
import { LoanRepository } from '../../repositories/implementations/loan.repository'
import { IMakeLoanRequestDTO } from './make-loan.dto'
import moment from 'moment'
import { FormattedInstallment } from '../../services/utils/interface'
import { StatusInstallment, StatusLoan } from '../../services/utils/enum'
import { CommonError } from '../../services/errors/common-error'

export class MakeLoanUseCase {
  constructor (
        private loanRepository: LoanRepository,
        private installmentRepository: InstallmentRepository
  ) {}

  async execute (data: IMakeLoanRequestDTO): Promise<FormattedInstallment[]> {
    const loan = await this.loanRepository.findOneById(data.loanId)

    if (!loan) { throw new CommonError('Sorry but we did not find this loan offer in our system') }

    const formattedInstallmentArray: FormattedInstallment[] = []

    const todayDate = moment().format('YYYY-MM-DD')

    for (let i = 0; i < loan.numberOfInstallments; i++) {
      const dueDate = moment(todayDate).add(i + 1, 'M')

      const installment: InstallmentModel = {
        loanId: loan.loanId as string,
        dueDate: new Date(dueDate.format()),
        status: StatusInstallment.PENDING
      }

      const savedInstallment: InstallmentModel = await this.installmentRepository.save(installment)

      const formattedInstallment: FormattedInstallment = {
        installmentId: savedInstallment.installmentId as string,
        dueDate: dueDate.format('DD-MM-YYYY'),
        status: savedInstallment.status
      }

      formattedInstallmentArray.push(formattedInstallment)
    }

    loan.status = StatusLoan.APPROVED
    await this.loanRepository.update(loan)

    return formattedInstallmentArray
  }
}
