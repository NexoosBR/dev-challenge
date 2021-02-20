import { IAddressDTO } from '../dtos/address.dto'
import { Address } from '../infra/typeorm/models/address.model'

interface IAddressRepository {
  save(address: IAddressDTO): Promise<Address>
  find(): Promise<Address[]>;
  findById (id: number): Promise<Address>;
}

export { IAddressRepository }
