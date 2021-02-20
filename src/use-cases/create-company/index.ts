import { CompanyAddressRepository } from '../../repositories/implementations/company-address.repository'
import { CompanyTelephoneRepository } from '../../repositories/implementations/company-telephone.repository'
import { CompanyRepository } from '../../repositories/implementations/company.repository'
import { CreateCompanyController } from './create-company.controller'
import { CreateCompanyUseCase } from './create-company.use-case'

const companyRepository = new CompanyRepository()

const companyAddressRepository = new CompanyAddressRepository()

const companyTelephoneRepository = new CompanyTelephoneRepository()

const createCompanyUseCase = new CreateCompanyUseCase(
  companyRepository,
  companyAddressRepository,
  companyTelephoneRepository
)

const createCompanyController = new CreateCompanyController(
  createCompanyUseCase
)

export { createCompanyController }
