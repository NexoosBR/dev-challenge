import { uuid } from 'uuidv4'
import { CompanyModel } from '../../../models/company.model'
import { CreditRequestModel } from '../../../models/credit-request.model'
import { StatusCreditRequest } from '../../../services/utils/enum'
import { ICreateCreditRequestDTO } from '../../../use-cases/create-credit-request/create-credit-request.dto'

export const createCreditRequestDTOValueOk: ICreateCreditRequestDTO = {
  companyId: uuid(),
  value: 100000
}

export const createCreditRequestDTOValueNotOk: ICreateCreditRequestDTO = {
  companyId: uuid(),
  value: 100
}

export const savedCreditRequest: CreditRequestModel = {
  creditRequestId: uuid(),
  companyId: createCreditRequestDTOValueOk.companyId,
  value: createCreditRequestDTOValueOk.value,
  status: StatusCreditRequest.APPROVED
}

export const foundCompany: CompanyModel = {
  companyId: uuid(),
  companyName: 'Company Test Name',
  cnpj: '33383168000119'
}
