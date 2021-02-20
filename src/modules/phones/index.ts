
import { IPhoneDTO } from './dtos/phone.dto'
import { PhoneRepository } from './infra/typeorm/repositories/phone.repository'
import { CreatePhoneUseCase } from './use-case/create-phone.use-case'

async function exportCreatePhone (phone: IPhoneDTO) {
  const phoneRepository = new PhoneRepository()
  const createPhoneUseCase = new CreatePhoneUseCase(phoneRepository)

  return createPhoneUseCase.execute(phone)
}

export { exportCreatePhone }
