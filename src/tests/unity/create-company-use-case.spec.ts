import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { CompanyAddressRepository } from '../../repositories/implementations/company-address.repository'
import { CompanyTelephoneRepository } from '../../repositories/implementations/company-telephone.repository'
import { CompanyRepository } from '../../repositories/implementations/company.repository'
import { CommonError } from '../../services/errors/common-error'
import { CompanyWithAddressAndTelephone } from '../../services/utils/interface'
import { CreateCompanyUseCase } from '../../use-cases/create-company/create-company.use-case'
import { createCompanyRequestDTO, createCompanyUseCaseResult, savedCompany, savedCompanyAddress, savedCompanyTelephone } from '../support/data/create-company-use-case.data'

chai.use(chaiAsPromised)

describe('Unity | create new Company UseCase', async () => {
  let companyRepository: CompanyRepository
  let companyAddressRepository: CompanyAddressRepository
  let companyTelephoneRepository: CompanyTelephoneRepository

  let fakeSaveCompanyRepository: sinon.SinonStub
  let fakeFindOneByCnpjCompanyRepository: sinon.SinonStub
  let fakeSaveCompanyAddressRepository: sinon.SinonStub
  let fakeSaveCompanyTelephoneRepository: sinon.SinonStub

  before(() => {
    companyRepository = new CompanyRepository()
    companyAddressRepository = new CompanyAddressRepository()
    companyTelephoneRepository = new CompanyTelephoneRepository()

    fakeSaveCompanyRepository = sinon.stub(companyRepository, 'save')
    fakeFindOneByCnpjCompanyRepository = sinon.stub(companyRepository, 'findOneByCnpj')
    fakeSaveCompanyAddressRepository = sinon.stub(companyAddressRepository, 'save')
    fakeSaveCompanyTelephoneRepository = sinon.stub(companyTelephoneRepository, 'save')
  })

  it('When a new company is registered I must return all registration data', async () => {
    const creatCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      companyAddressRepository,
      companyTelephoneRepository
    )

    fakeFindOneByCnpjCompanyRepository.resolves(
      undefined
    )

    fakeSaveCompanyRepository.resolves(
      savedCompany
    )

    fakeSaveCompanyAddressRepository.resolves(
      savedCompanyAddress
    )

    fakeSaveCompanyTelephoneRepository.resolves(
      savedCompanyTelephone
    )

    const result: CompanyWithAddressAndTelephone = await creatCompanyUseCase.execute(createCompanyRequestDTO)

    expect(result).to.be.eql(createCompanyUseCaseResult)
  })

  it('When a company that is already registered tries to register again I must throw error', async () => {
    const creatCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      companyAddressRepository,
      companyTelephoneRepository
    )

    fakeFindOneByCnpjCompanyRepository.resolves(
      savedCompany
    )

    fakeSaveCompanyRepository.resolves(
      savedCompany
    )

    fakeSaveCompanyAddressRepository.resolves(
      savedCompanyAddress
    )

    fakeSaveCompanyTelephoneRepository.resolves(
      savedCompanyTelephone
    )

    await expect(creatCompanyUseCase.execute(createCompanyRequestDTO)).to.be.rejectedWith(CommonError, 'Sorry but this cnpj is already registered in our system')
  })

  it('When a new company is registered I must call the save() method of all Repositories and the findOneByCnpj() method by companyRepository', async () => {
    const creatCompanyUseCase = new CreateCompanyUseCase(
      companyRepository,
      companyAddressRepository,
      companyTelephoneRepository
    )

    fakeFindOneByCnpjCompanyRepository.resolves(
      undefined
    )

    fakeSaveCompanyRepository.resolves(
      savedCompany
    )

    fakeSaveCompanyAddressRepository.resolves(
      savedCompanyAddress
    )

    fakeSaveCompanyTelephoneRepository.resolves(
      savedCompanyTelephone
    )

    await creatCompanyUseCase.execute(createCompanyRequestDTO)

    expect(fakeFindOneByCnpjCompanyRepository.called).to.be.true
    expect(fakeSaveCompanyRepository.called).to.be.true
    expect(fakeSaveCompanyAddressRepository.called).to.be.true
    expect(fakeSaveCompanyTelephoneRepository.called).to.be.true
  })

  after(() => {
    fakeSaveCompanyRepository.restore()
    fakeSaveCompanyAddressRepository.restore()
    fakeSaveCompanyTelephoneRepository.restore()
  })
})
