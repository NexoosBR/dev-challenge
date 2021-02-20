import { uuid } from 'uuidv4'
import { CompanyAddressModel } from '../../../models/company-address.model'
import { CompanyTelephoneModel } from '../../../models/company-telephone.model'
import { CompanyModel } from '../../../models/company.model'
import { CompanyWithAddressAndTelephone } from '../../../services/utils/interface'
import { ICreateCompanyRequestDTO } from '../../../use-cases/create-company/create-company.dto'

export const createCompanyRequestDTO: ICreateCompanyRequestDTO = {
  companyName: 'Company Test Name Ltda.',
  cnpj: '52498323000161',
  fullAddress: [
    {
      address: 'Paulista Avenue',
      number: 1345,
      complement: 'APT 564',
      cep: '01114001',
      neighborhood: 'Jd Paulista',
      city: 'São Paulo',
      state: 'SP'
    }],
  telephone: [
    {
      telephoneNumber: '954542610'
    }
  ]
}

export const savedCompany: CompanyModel = {
  companyId: uuid(),
  companyName: createCompanyRequestDTO.companyName,
  cnpj: createCompanyRequestDTO.cnpj
}

export const savedCompanyAddress: CompanyAddressModel = {
  companyAddressId: uuid(),
  companyId: savedCompany.companyId as string,
  address: createCompanyRequestDTO.fullAddress[0].address,
  number: createCompanyRequestDTO.fullAddress[0].number,
  cep: createCompanyRequestDTO.fullAddress[0].cep,
  complement: createCompanyRequestDTO.fullAddress[0].complement,
  neighborhood: createCompanyRequestDTO.fullAddress[0].neighborhood,
  city: createCompanyRequestDTO.fullAddress[0].city,
  state: createCompanyRequestDTO.fullAddress[0].state
}

export const savedCompanyTelephone: CompanyTelephoneModel =
    {
      companyTelephoneId: uuid(),
      companyId: savedCompany.companyId as string,
      telephone: createCompanyRequestDTO.telephone[0].telephoneNumber
    }

export const createCompanyUseCaseResult: CompanyWithAddressAndTelephone = {
  company: savedCompany,
  address: [savedCompanyAddress],
  telephone: [savedCompanyTelephone]
}
