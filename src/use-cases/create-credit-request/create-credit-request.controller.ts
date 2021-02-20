import { Request, Response } from 'express'
import { CreditRequestModel } from '../../models/credit-request.model'
import { CommonError } from '../../services/errors/common-error'
import { ICreateCreditRequestDTO } from './create-credit-request.dto'
import { CreateCreditRequestUseCase } from './create-credit-request.use-case'

export class CreateCreditRequestController {
  constructor (
        private createCreditRequestUseCase: CreateCreditRequestUseCase
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const requestData: ICreateCreditRequestDTO = request.body

      const result: CreditRequestModel = await this.createCreditRequestUseCase.execute(requestData)

      return response.status(200).json({
        error: false,
        result: result,
        message: 'Congratulations! your credit request has been approved and you can now check our loan offer'
      })
    } catch (error) {
      if (error instanceof CommonError) {
        return response.status(error.statusCode).json({
          message: error.message
        })
      }
      return response.status(400).json({
        message: 'Unexpected Error in Create Credit UseCase'
      })
    }
  }
}
