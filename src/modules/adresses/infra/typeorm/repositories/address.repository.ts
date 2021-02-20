import { IAddressDTO } from '../../../dtos/address.dto'
import { getRepository } from 'typeorm'
import { IAddressRepository } from '../../../interfaces/address.interface'
import { Address } from '../models/address.model'

class AddressRepository implements IAddressRepository {
  async save (address: IAddressDTO, ormRepository = getRepository(Address)): Promise<Address> {
    const savedAddress = await ormRepository.save(address)

    return savedAddress
  }

  async find (ormRepository = getRepository(Address)): Promise<Address[]> {
    const addresss = await ormRepository.find()

    return addresss
  }

  async findById (id: number, ormRepository = getRepository(Address)): Promise<Address> {
    const address = await ormRepository.findOneOrFail(id)

    return address
  }
}

export { AddressRepository }
