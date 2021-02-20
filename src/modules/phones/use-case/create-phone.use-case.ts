import { IPhoneDTO } from '../../../modules/phones/dtos/phone.dto'
import { AppError } from '../../../shared/errors/app.error'

import { Phone } from '../infra/typeorm/models/phone.model'
import { IPhoneRepository } from '../interfaces/phone.interface'

class CreatePhoneUseCase {
  constructor (private phoneRepository: IPhoneRepository) { /** */ }

  async execute (phone: IPhoneDTO): Promise<Phone> {
    if (phone.client) throw new AppError('client id not found.')

    phone.phoneNumber = phone.phoneNumber.replace(/[^0-9]/gi, '')

    if (phone.phoneNumber.length < 9) throw new AppError('insufficient phone number')

    return this.phoneRepository.save(phone)
  }
}

export { CreatePhoneUseCase }
