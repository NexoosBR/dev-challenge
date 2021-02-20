import { IAddressDTO } from '../dtos/address.dto'
import { AppError } from '../../../shared/errors/app.error'

import { Address } from '../infra/typeorm/models/address.model'
import { IAddressRepository } from '../interfaces/address.interface'

class CreateAddressUseCase {
  constructor (private addressRepository: IAddressRepository) { /** */ }

  async execute (address: IAddressDTO): Promise<Address> {
    if (address.client) throw new AppError('client id not found.')

    address.zipCode = address.zipCode.replace(/[^0-9]/gi, '')

    if (address.zipCode.length < 8) throw new AppError('Incorrect zip code')

    return this.addressRepository.save(address)
  }
}

export { CreateAddressUseCase }
