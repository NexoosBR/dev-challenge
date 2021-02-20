import { exportCreateAddress } from '../../../modules/adresses'
import { exportCreatePhone } from '../../../modules/phones'
import { AppError } from '../../../shared/errors/app.error'
import { IClientDTO } from '../dtos/client.dto'
import { Client } from '../infra/typeorm/models/client.model'
import { ClienteRepository } from '../infra/typeorm/repositories/client.repository'

class CreateClientUseCase {
  constructor () { /** */ }

  async execute (client: IClientDTO): Promise<Client> {
    const ormRepository = new ClienteRepository()

    if (client.cnpj.length < 14) throw new AppError('insufficient cnpj number')

    const clientToSave: Client = {
      cnpj: client.cnpj,
      companyName: client.companyName
    }

    const createdClient = await ormRepository.save(clientToSave)

    client.address.map(async (address) => {
      await exportCreateAddress({ ...address, id: createdClient.id })
    })

    client.phone.map(async (phone) => {
      await exportCreatePhone({ ...phone, id: createdClient.id })
    })

    return createdClient
  }
}

export { CreateClientUseCase }
