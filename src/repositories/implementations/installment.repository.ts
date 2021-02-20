import { getRepository } from 'typeorm'
import { InstallmentModel } from '../../models/installment.model'
import { IInstallmentRepository } from '../i-installment.repository'

export class InstallmentRepository implements IInstallmentRepository {
  async save (installment: InstallmentModel, repository = getRepository(InstallmentModel)): Promise<InstallmentModel> {
    const savedInstallment = await repository.save(installment)
    return savedInstallment
  }

  async findOne (installmentId: string, repository = getRepository(InstallmentModel)): Promise<InstallmentModel | undefined> {
    const installment = await repository.findOne({
      where: { installmentId: installmentId }
    })
    return installment
  }

  async update (installment: Partial<InstallmentModel>, repository = getRepository(InstallmentModel)): Promise<InstallmentModel> {
    const updatedInstallment = await repository.save(installment)

    return updatedInstallment
  }
}
