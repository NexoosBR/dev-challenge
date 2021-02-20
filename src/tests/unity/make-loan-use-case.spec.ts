import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { InstallmentRepository } from '../../repositories/implementations/installment.repository'
import { LoanRepository } from '../../repositories/implementations/loan.repository'
import { CommonError } from '../../services/errors/common-error'
import { FormattedInstallment } from '../../services/utils/interface'
import { MakeLoanUseCase } from '../../use-cases/make-loan/make-loan.use-case'
import { foundLoan, loanIdObject, savedInstallment } from '../support/data/make-loan-use-case.data'

chai.use(chaiAsPromised)

describe('Unity | make Loan UseCase', async () => {
  let installmentRepository: InstallmentRepository
  let loanRepository: LoanRepository

  let fakeSaveInstallmentRepository: sinon.SinonStub
  let fakeFindOneByIdLoanRepository: sinon.SinonStub
  let fakeUpdateLoanRepository: sinon.SinonStub

  before(() => {
    installmentRepository = new InstallmentRepository()
    loanRepository = new LoanRepository()

    fakeSaveInstallmentRepository = sinon.stub(installmentRepository, 'save')
    fakeFindOneByIdLoanRepository = sinon.stub(loanRepository, 'findOneById')
    fakeUpdateLoanRepository = sinon.stub(loanRepository, 'update')
  })

  it('When I accept the loan offer I need to receive all installments with a due date and value', async () => {
    const makeLoanUseCase = new MakeLoanUseCase(
      loanRepository,
      installmentRepository
    )

    fakeFindOneByIdLoanRepository.resolves(
      foundLoan
    )

    fakeSaveInstallmentRepository.resolves(
      savedInstallment
    )

    fakeUpdateLoanRepository.resolves(
      undefined
    )

    const result: FormattedInstallment[] = await makeLoanUseCase.execute(loanIdObject)

    expect(result.length).to.be.eql(foundLoan.numberOfInstallments)
  })

  it('When we cant find the loan offer youre looking for in our system, i must throw error', async () => {
    const makeLoanUseCase = new MakeLoanUseCase(
      loanRepository,
      installmentRepository
    )

    fakeFindOneByIdLoanRepository.resolves(
      undefined
    )

    await expect(makeLoanUseCase.execute(loanIdObject)).to.be.rejectedWith(CommonError, 'Sorry but we did not find this loan offer in our system')
  })

  it('When a loan offer is is accepted I must call the findOneById() method of loanRepository, the save() and update() method of loanRepository', async () => {
    const makeLoanUseCase = new MakeLoanUseCase(
      loanRepository,
      installmentRepository
    )

    fakeFindOneByIdLoanRepository.resolves(
      foundLoan
    )

    fakeSaveInstallmentRepository.resolves(
      savedInstallment
    )

    fakeUpdateLoanRepository.resolves(
      undefined
    )

    await makeLoanUseCase.execute(loanIdObject)

    expect(fakeFindOneByIdLoanRepository.called).to.be.true
    expect(fakeSaveInstallmentRepository.called).to.be.true
    expect(fakeUpdateLoanRepository.called).to.be.true
  })

  after(() => {
    fakeFindOneByIdLoanRepository.restore()
    fakeSaveInstallmentRepository.restore()
    fakeUpdateLoanRepository.restore()
  })
})
