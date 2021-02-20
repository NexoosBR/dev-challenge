import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { CreditRequestModel } from '../../models/credit-request.model'
import { CompanyRepository } from '../../repositories/implementations/company.repository'
import { CreditRequestRepository } from '../../repositories/implementations/credit-request.repository'
import { CommonError } from '../../services/errors/common-error'
import { CreateCreditRequestUseCase } from '../../use-cases/create-credit-request/create-credit-request.use-case'
import { createCreditRequestDTOValueNotOk, createCreditRequestDTOValueOk, foundCompany, savedCreditRequest } from '../support/data/create-credit-request-use-case.data'

chai.use(chaiAsPromised)

describe('Unity | create new Credit Request UseCase', async () => {
  let creditRequestRepository: CreditRequestRepository
  let companyRepository: CompanyRepository

  let fakeSaveCreditRequestRepository: sinon.SinonStub
  let fakeFindOneByIdCompanyRepository: sinon.SinonStub

  before(() => {
    creditRequestRepository = new CreditRequestRepository()
    companyRepository = new CompanyRepository()

    fakeSaveCreditRequestRepository = sinon.stub(creditRequestRepository, 'save')
    fakeFindOneByIdCompanyRepository = sinon.stub(companyRepository, 'findOneById')
  })

  it('When there is a credit request with the amount within the allowed margin, I must return all the registration data', async () => {
    const creatCreditRequestUseCase = new CreateCreditRequestUseCase(
      creditRequestRepository,
      companyRepository
    )

    fakeFindOneByIdCompanyRepository.resolves(
      foundCompany
    )

    fakeSaveCreditRequestRepository.resolves(
      savedCreditRequest
    )

    const result: CreditRequestModel = await creatCreditRequestUseCase.execute(createCreditRequestDTOValueOk)

    expect(result).to.be.eql(savedCreditRequest)
  })

  it('When there is a credit request with the amount outside the allowed margin, i must throw error', async () => {
    const creatCreditRequestUseCase = new CreateCreditRequestUseCase(
      creditRequestRepository,
      companyRepository
    )

    await expect(creatCreditRequestUseCase.execute(createCreditRequestDTOValueNotOk)).to.be.rejectedWith(CommonError, 'The amount requested must be between R$ 15.000,00 and R$ 1.800.000,00')
  })

  it('When we cant find the company youre looking for in our system, i must throw error', async () => {
    const creatCreditRequestUseCase = new CreateCreditRequestUseCase(
      creditRequestRepository,
      companyRepository
    )

    fakeFindOneByIdCompanyRepository.resolves(
      undefined
    )

    await expect(creatCreditRequestUseCase.execute(createCreditRequestDTOValueOk)).to.be.rejectedWith(CommonError, 'Sorry but we did not find this company in our system')
  })

  it('When a credit request is registered I must call the save() method of creditRequestRepository and findOneById() method of companyRepository', async () => {
    const creatCreditRequestUseCase = new CreateCreditRequestUseCase(
      creditRequestRepository,
      companyRepository
    )

    fakeFindOneByIdCompanyRepository.resolves(
      foundCompany
    )

    fakeSaveCreditRequestRepository.resolves(
      savedCreditRequest
    )

    await creatCreditRequestUseCase.execute(createCreditRequestDTOValueOk)

    expect(fakeSaveCreditRequestRepository.called).to.be.true
    expect(fakeFindOneByIdCompanyRepository.called).to.be.true
  })

  after(() => {
    fakeSaveCreditRequestRepository.restore()
    fakeFindOneByIdCompanyRepository.restore()
  })
})
