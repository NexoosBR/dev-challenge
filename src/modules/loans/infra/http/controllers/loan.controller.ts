import { Request, Response } from 'express'
import { ILoanDTO } from '../../../dtos/loan.dto'
import { ILoanRepository } from '../../../interfaces/loan.interface'
import { CheckLoanStatusUseCase } from '../../../use-cases/check-loan-status.use-case'
import { CreditRequestUseCase } from '../../../use-cases/credit-request.use-case'
import { MakeALoanUseCase } from '../../../use-cases/make-a-loan.use-case'

import { LoanRepository } from '../../typeorm/repositories/loan.repository'

class LoanController {
  constructor (private ormRepository: ILoanRepository = new LoanRepository()) { /** */ }

  async createCreditRequest (req: Request, res: Response): Promise<void> {
    const clientId = req.params.id

    const loan: ILoanDTO = req.body

    const creditRequestUseCase = new CreditRequestUseCase(this.ormRepository)

    const result = await creditRequestUseCase.execute({ ...loan, client: clientId })

    res.status(200).json({ error: false, result, message: 'Your credit request was successful' })
  }

  async makeALoan (req: Request, res: Response): Promise<void> {
    const loanId = req.params.id

    const makeALoanUseCase = new MakeALoanUseCase()

    const result = await makeALoanUseCase.execute(loanId)

    res.status(200).json({ error: false, result, message: 'Your loan has been approved.' })
  }

  async checkLoanStatus (req: Request, res: Response): Promise<void> {
    const loanId = req.params.id

    const checkLoanStatusUseCase = new CheckLoanStatusUseCase()

    const result = await checkLoanStatusUseCase.execute(loanId)

    res.status(200).json({ error: false, result: { status: result.status }, message: `Your loan status is: ${result.status}` })
  }
}

export { LoanController }
