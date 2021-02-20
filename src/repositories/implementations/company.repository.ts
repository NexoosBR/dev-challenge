import { getRepository } from 'typeorm'
import { CompanyModel } from '../../models/company.model'
import { ICompanyRepository } from '../i-company.repository'

export class CompanyRepository implements ICompanyRepository {
  async save (company: CompanyModel, repository = getRepository(CompanyModel)): Promise<CompanyModel> {
    const savedCompany = await repository.save(company)
    return savedCompany
  }

  async findOneById (companyId: string, repository = getRepository(CompanyModel)): Promise<CompanyModel | undefined> {
    const company = await repository.findOne({
      where: { companyId: companyId }
    })
    return company
  }

  async findOneByCnpj (cnpj: string, repository = getRepository(CompanyModel)): Promise<CompanyModel | undefined> {
    const company = await repository.findOne({
      where: { cnpj: cnpj }
    })
    return company
  }

  async update (company: Partial<CompanyModel>, repository = getRepository(CompanyModel)): Promise<CompanyModel> {
    const updatedCompany = await repository.save(company)

    return updatedCompany
  }
}
