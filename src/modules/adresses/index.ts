import { IAddressDTO } from '../../modules/adresses/dtos/address.dto'

import { AddressRepository } from './infra/typeorm/repositories/address.repository'
import { CreateAddressUseCase } from './use-case/create-address.use-case'

async function exportCreateAddress (address: IAddressDTO) {
  const addressRepository = new AddressRepository()
  const createAddressUseCase = new CreateAddressUseCase(addressRepository)

  return createAddressUseCase.execute(address)
}

export { exportCreateAddress }
