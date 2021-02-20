import { getRepository } from 'typeorm'
import { CreditRequestModel } from '../../models/credit-request.model'
import { ICreditRequestRepository } from '../i-credit-request.repository'

export class CreditRequestRepository implements ICreditRequestRepository {
  async save (creditRequest: CreditRequestModel, repository = getRepository(CreditRequestModel)): Promise<CreditRequestModel> {
    const savedCreditRequest = await repository.save(creditRequest)
    return savedCreditRequest
  }

  async findOne (creditRequestId: string, repository = getRepository(CreditRequestModel)): Promise<CreditRequestModel | undefined> {
    const creditRequest = await repository.findOne({
      where: { creditRequestId: creditRequestId }
    })
    return creditRequest
  }

  async update (creditRequest: Partial<CreditRequestModel>, repository = getRepository(CreditRequestModel)): Promise<CreditRequestModel> {
    const updatedCreditRequest = await repository.save(creditRequest)

    return updatedCreditRequest
  }
}
