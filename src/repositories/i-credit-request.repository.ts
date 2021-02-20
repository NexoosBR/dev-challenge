import { CreditRequestModel } from '../models/credit-request.model'

export interface ICreditRequestRepository {
    save(creditRequest: CreditRequestModel): Promise<CreditRequestModel>
    findOne(creditRequestId: string): Promise<CreditRequestModel | undefined>
    update(creditRequest: Partial<CreditRequestModel>): Promise<CreditRequestModel>
}
