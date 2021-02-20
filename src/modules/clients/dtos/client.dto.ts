import { IAddressDTO } from '../../../modules/adresses/dtos/address.dto'
import { IPhoneDTO } from '../../../modules/phones/dtos/phone.dto'

interface IClientDTO {
  id: string;
  companyName: string
  cnpj: string
  address: IAddressDTO[]
  phone: IPhoneDTO[]
  created?: Date
  updated?: Date
  version?: number
}

export { IClientDTO }
