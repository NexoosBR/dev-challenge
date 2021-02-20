import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { CreditRequestRepository } from '../../repositories/implementations/credit-request.repository'
import { LoanRepository } from '../../repositories/implementations/loan.repository'
import { CommonError } from '../../services/errors/common-error'
import { FormattedLoan } from '../../services/utils/interface'
import { LoanOfferUseCase } from '../../use-cases/loan-offer/loan-offer.use-case'
import { creditRequestFound, creditRequestId, formattedLoan, savedLoan } from '../support/data/loan-offer-use-case.data'

chai.use(chaiAsPromised)

describe('Unity | offer new Loan UseCase', async () => {
  let creditRequestRepository: CreditRequestRepository
  let loanRepository: LoanRepository

  let fakeFindOneCreditRequestRepository: sinon.SinonStub
  let fakeSaveLoanRepository: sinon.SinonStub
  let fakeFindOneByCreditRequestIdLoanRepository: sinon.SinonStub

  before(() => {
    creditRequestRepository = new CreditRequestRepository()
    loanRepository = new LoanRepository()

    fakeFindOneCreditRequestRepository = sinon.stub(creditRequestRepository, 'findOne')
    fakeSaveLoanRepository = sinon.stub(loanRepository, 'save')
    fakeFindOneByCreditRequestIdLoanRepository = sinon.stub(loanRepository, 'findOneByCreditRequestId')
  })

  it('When I ask for the loan offer I must receive all the details of the offer', async () => {
    const loanOfferUseCase = new LoanOfferUseCase(
      loanRepository,
      creditRequestRepository
    )

    fakeFindOneCreditRequestRepository.resolves(
      creditRequestFound
    )

    fakeFindOneByCreditRequestIdLoanRepository.resolves(
      undefined
    )

    fakeSaveLoanRepository.resolves(
      savedLoan
    )

    const result: FormattedLoan = await loanOfferUseCase.execute(creditRequestId)

    expect(result).to.be.eql(formattedLoan)
  })

  it('When we cant find the credit request youre looking for in our system, i must throw error', async () => {
    const loanOfferUseCase = new LoanOfferUseCase(
      loanRepository,
      creditRequestRepository
    )

    fakeFindOneCreditRequestRepository.resolves(
      undefined
    )

    fakeFindOneByCreditRequestIdLoanRepository.resolves(
      savedLoan
    )

    fakeSaveLoanRepository.resolves(
      savedLoan
    )

    await expect(loanOfferUseCase.execute(creditRequestId)).to.be.rejectedWith(CommonError, 'Sorry but we did not find this credit request in our system')
  })

  it('When we already have a loan offer for the credit application sent in the request, i must throw rrror', async () => {
    const loanOfferUseCase = new LoanOfferUseCase(
      loanRepository,
      creditRequestRepository
    )

    fakeFindOneCreditRequestRepository.resolves(
      creditRequestFound
    )

    fakeFindOneByCreditRequestIdLoanRepository.resolves(
      savedLoan
    )

    fakeSaveLoanRepository.resolves(
      savedLoan
    )

    await expect(loanOfferUseCase.execute(creditRequestId)).to.be.rejectedWith(CommonError, 'Sorry but we already have a loan offer for this credit request')
  })

  it('When a loan offer is registered I must call the findOne() method of creditRequestRepository, the save() and findOneByCreditRequestId() method of loanRepository', async () => {
    const loanOfferUseCase = new LoanOfferUseCase(
      loanRepository,
      creditRequestRepository
    )

    fakeFindOneCreditRequestRepository.resolves(
      creditRequestFound
    )

    fakeFindOneByCreditRequestIdLoanRepository.resolves(
      undefined
    )

    fakeSaveLoanRepository.resolves(
      savedLoan
    )

    await loanOfferUseCase.execute(creditRequestId)

    expect(fakeFindOneCreditRequestRepository.called).to.be.true
    expect(fakeSaveLoanRepository.called).to.be.true
    expect(fakeFindOneByCreditRequestIdLoanRepository.called).to.be.true
  })

  after(() => {
    fakeFindOneCreditRequestRepository.restore()
    fakeSaveLoanRepository.restore()
    fakeFindOneByCreditRequestIdLoanRepository.restore()
  })
})
