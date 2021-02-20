import { Client } from '../infra/typeorm/models/client.model'

interface IClientRepository {
  save(client: Client): Promise<Client>
  find(): Promise<Client[]>
  findById(id: number): Promise<Client>
}

export { IClientRepository }
