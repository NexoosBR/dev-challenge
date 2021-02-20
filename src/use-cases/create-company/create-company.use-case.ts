import { CompanyWithAddressAndTelephone } from '../../services/utils/interface'
import { CompanyAddressModel } from '../../models/company-address.model'
import { CompanyTelephoneModel } from '../../models/company-telephone.model'
import { CompanyModel } from '../../models/company.model'
import { CompanyAddressRepository } from '../../repositories/implementations/company-address.repository'
import { CompanyTelephoneRepository } from '../../repositories/implementations/company-telephone.repository'
import { CompanyRepository } from '../../repositories/implementations/company.repository'
import { ICreateCompanyRequestDTO } from './create-company.dto'
import { CommonError } from '../../services/errors/common-error'

export class CreateCompanyUseCase {
  constructor (
        private companyRepository: CompanyRepository,
        private companyAdressRepository: CompanyAddressRepository,
        private companyTelephoneRepository: CompanyTelephoneRepository
  ) {}

  async execute (data: ICreateCompanyRequestDTO): Promise<CompanyWithAddressAndTelephone> {
    const company: CompanyModel = {
      companyName: data.companyName,
      cnpj: data.cnpj
    }

    const companyExist = await this.companyRepository.findOneByCnpj(data.cnpj)
    if (companyExist) { throw new CommonError('Sorry but this cnpj is already registered in our system') }

    const savedCompany = await this.companyRepository.save(company)

    const companyTelephoneArray: CompanyTelephoneModel[] = data.telephone.map(telephone => {
      return {
        companyId: savedCompany.companyId as string,
        telephone: telephone.telephoneNumber
      }
    })

    const companyAddressArray: CompanyAddressModel[] = data.fullAddress.map(address => {
      return {
        companyId: savedCompany.companyId as string,
        address: address.address,
        number: address.number,
        complement: address.complement ?? '',
        cep: address.cep,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state
      }
    })

    const savedCompanyAddress: CompanyAddressModel[] = []
    const savedCompanyTelephone:CompanyTelephoneModel[] = []

    for (const companyAdress of companyAddressArray) {
      savedCompanyAddress.push(await this.companyAdressRepository.save(companyAdress))
    }

    for (const companyTelephone of companyTelephoneArray) {
      savedCompanyTelephone.push(await this.companyTelephoneRepository.save(companyTelephone))
    }

    return { company: savedCompany, address: savedCompanyAddress, telephone: savedCompanyTelephone }
  }
}
