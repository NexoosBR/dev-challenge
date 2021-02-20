import { CompanyTelephoneModel } from '../models/company-telephone.model'

export interface ICompanyTelephoneRepository {
    save(companyTelephone: CompanyTelephoneModel): Promise<CompanyTelephoneModel>
    findOne(companyTelephoneId: string): Promise<CompanyTelephoneModel | undefined>
    update(company: Partial<CompanyTelephoneModel>): Promise<CompanyTelephoneModel>
}
