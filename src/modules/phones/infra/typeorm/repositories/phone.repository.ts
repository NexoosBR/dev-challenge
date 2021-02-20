import { IPhoneDTO } from '../../../dtos/phone.dto'
import { getRepository } from 'typeorm'
import { IPhoneRepository } from '../../../interfaces/phone.interface'
import { Phone } from '../models/phone.model'

class PhoneRepository implements IPhoneRepository {
  async save (phone: IPhoneDTO, ormRepository = getRepository(Phone)): Promise<Phone> {
    const savedPhone = await ormRepository.save(phone)

    return savedPhone
  }

  async find (ormRepository = getRepository(Phone)): Promise<Phone[]> {
    const phones = await ormRepository.find()

    return phones
  }

  async findById (id: number, ormRepository = getRepository(Phone)): Promise<Phone> {
    const phone = await ormRepository.findOneOrFail(id)

    return phone
  }
}

export { PhoneRepository }
