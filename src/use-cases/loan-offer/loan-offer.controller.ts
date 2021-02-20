import { Request, Response } from 'express'
import { CommonError } from '../../services/errors/common-error'
import { FormattedLoan } from '../../services/utils/interface'
import { LoanOfferUseCase } from './loan-offer.use-case'

export class LoanOfferController {
  constructor (
        private loanOfferUseCase: LoanOfferUseCase
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const creditRequestId: string = request.params.creditRequestId

      const result: FormattedLoan = await this.loanOfferUseCase.execute(creditRequestId)

      return response.status(200).json({ error: false, result: result })
    } catch (error) {
      if (error instanceof CommonError) {
        return response.status(error.statusCode).json({
          message: error.message
        })
      }
      return response.status(400).json({
        message: 'Unexpected Error in Loan Offer UseCase'
      })
    }
  }
}
