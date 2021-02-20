import { Request, Response } from 'express'
import { CommonError } from '../../services/errors/common-error'
import { CompanyWithAddressAndTelephone } from '../../services/utils/interface'
import { ICreateCompanyRequestDTO } from './create-company.dto'
import { CreateCompanyUseCase } from './create-company.use-case'

export class CreateCompanyController {
  constructor (
        private createCompanyUseCase: CreateCompanyUseCase
  ) {}

  async handle (request: Request, response: Response): Promise<Response> {
    try {
      const requestData: ICreateCompanyRequestDTO = request.body

      const result: CompanyWithAddressAndTelephone = await this.createCompanyUseCase.execute(requestData)

      return response.status(200).json({
        error: false,
        result: result
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
