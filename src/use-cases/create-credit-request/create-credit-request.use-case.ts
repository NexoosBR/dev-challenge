import { CommonError } from '../../services/errors/common-error'
import { CreditRequestModel } from '../../models/credit-request.model'
import { CreditRequestRepository } from '../../repositories/implementations/credit-request.repository'
import { ICreateCreditRequestDTO } from './create-credit-request.dto'
import { StatusCreditRequest } from '../../services/utils/enum'
import { CompanyRepository } from '../../repositories/implementations/company.repository'

export class CreateCreditRequestUseCase {
  constructor (
        private creditRequestRepository: CreditRequestRepository,
        private companyRepository: CompanyRepository
  ) {}

  async execute (data: ICreateCreditRequestDTO): Promise<CreditRequestModel> {
    if (data.value < 15000 || data.value > 1800000) { throw new CommonError('The amount requested must be between R$ 15.000,00 and R$ 1.800.000,00') }

    const companyExist = await this.companyRepository.findOneById(data.companyId)

    if (!companyExist) { throw new CommonError('Sorry but we did not find this company in our system') }

    const creditRequest: CreditRequestModel = {
      companyId: data.companyId,
      value: data.value,
      status: StatusCreditRequest.APPROVED
    }

    const savedCreditRequest = await this.creditRequestRepository.save(creditRequest)

    return savedCreditRequest
  }
}
