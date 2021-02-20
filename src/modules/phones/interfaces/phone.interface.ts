import { IPhoneDTO } from '../dtos/phone.dto'
import { Phone } from '../infra/typeorm/models/phone.model'

interface IPhoneRepository {
  save(phone: IPhoneDTO): Promise<Phone>
  find(): Promise<Phone[]>;
  findById (id: number): Promise<Phone>;
}

export { IPhoneRepository }
