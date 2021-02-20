import { Client } from '../../../../../modules/clients/infra/typeorm/models/client.model'
import { IClientRepository } from '../../../../../modules/clients/interfaces/client.interface'
import { getRepository } from 'typeorm'

class ClienteRepository implements IClientRepository {
  async save (client: Client, ormRepository = getRepository(Client)): Promise<Client> {
    return ormRepository.save(client)
  }

  async find (ormRepository = getRepository(Client)): Promise<Client[]> {
    return ormRepository.find()
  }

  async findById (id: number, ormRepository = getRepository(Client)): Promise<Client> {
    return ormRepository.findOneOrFail({ where: { id } })
  }
}

export { ClienteRepository }
