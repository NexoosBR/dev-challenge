import { CompanyModel } from '../models/company.model'

export interface ICompanyRepository {
    save(company: CompanyModel): Promise<CompanyModel>
    findOneById(companyId: string): Promise<CompanyModel | undefined>
    findOneByCnpj(companyId: string): Promise<CompanyModel | undefined>
    update(company: Partial<CompanyModel>): Promise<CompanyModel>
}
