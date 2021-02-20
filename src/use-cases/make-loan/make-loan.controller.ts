import { Request, Response } from 'express'
import { CommonError } from '../../services/errors/common-error'
import { FormattedInstallment } from '../../services/utils/interface'
import { IMakeLoanRequestDTO } from './make-loan.dto'
import { MakeLoanUseCase } from './make-loan.use-case'

export class MakeLoanController {
  constructor (
        private makeLoanUseCase: MakeLoanUseCase
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const requestData: IMakeLoanRequestDTO = request.body

      const result: FormattedInstallment[] = await this.makeLoanUseCase.execute(requestData)

      return response.status(200).json({ error: false, result: result })
    } catch (error) {
      if (error instanceof CommonError) {
        return response.status(error.statusCode).json({
          message: error.message
        })
      }
      return response.status(400).json({
        message: 'Unexpected Error in Make Loan UseCase'
      })
    }
  }
}
