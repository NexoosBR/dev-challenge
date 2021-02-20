import { getRepository } from 'typeorm'
import { CompanyTelephoneModel } from '../../models/company-telephone.model'
import { ICompanyTelephoneRepository } from '../i-company-telephone.repository'

export class CompanyTelephoneRepository implements ICompanyTelephoneRepository {
  async save (companyTelephone: CompanyTelephoneModel, repository = getRepository(CompanyTelephoneModel)): Promise<CompanyTelephoneModel> {
    const savedCompanyTelephone = await repository.save(companyTelephone)
    return savedCompanyTelephone
  }

  async findOne (companyTelephoneId: string, repository = getRepository(CompanyTelephoneModel)): Promise<CompanyTelephoneModel | undefined> {
    const companyTelephone = await repository.findOne({
      where: { companyTelephoneId: companyTelephoneId }
    })
    return companyTelephone
  }

  async update (companyTelephone: Partial<CompanyTelephoneModel>, repository = getRepository(CompanyTelephoneModel)): Promise<CompanyTelephoneModel> {
    const updatedCompanyTelephone = await repository.save(companyTelephone)

    return updatedCompanyTelephone
  }
}
