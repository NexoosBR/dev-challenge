import { getRepository } from 'typeorm'
import { CompanyAddressModel } from '../../models/company-address.model'
import { ICompanyAddressRepository } from '../i-company-address.repository'

export class CompanyAddressRepository implements ICompanyAddressRepository {
  async save (companyAddress: CompanyAddressModel, repository = getRepository(CompanyAddressModel)): Promise<CompanyAddressModel> {
    const savedCompanyAddress = await repository.save(companyAddress)
    return savedCompanyAddress
  }

  async findOne (companyAddressId: string, repository = getRepository(CompanyAddressModel)): Promise<CompanyAddressModel | undefined> {
    const companyAddress = await repository.findOne({
      where: { companyAddressId: companyAddressId }
    })
    return companyAddress
  }

  async update (companyAddress: Partial<CompanyAddressModel>, repository = getRepository(CompanyAddressModel)): Promise<CompanyAddressModel> {
    const updatedCompanyAddress = await repository.save(companyAddress)

    return updatedCompanyAddress
  }
}
