import { Request, Response } from 'express'
import { CreditRequestModel } from '../../models/credit-request.model'
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

      return response.status(200).json({ error: false, result: result })
    } catch (error) {
      return response.status(400).json({
        message: `Error - ${error.message}` || 'Unexpected Error in Create Credit Request UseCase'
      })
    }
  }
}
