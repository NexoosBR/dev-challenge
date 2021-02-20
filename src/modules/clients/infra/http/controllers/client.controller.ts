import { Request, Response } from 'express'

import { IClientDTO } from '../../../../../modules/clients/dtos/client.dto'
import { CreateClientUseCase } from '../../../../../modules/clients/user-cases/create-client.use-case'

class ClientController {
  constructor () { /**  */ }

  public async creatAndSave (req: Request, res: Response): Promise<void> {
    const client: IClientDTO = req.body

    const createProductService = new CreateClientUseCase()

    const result = await createProductService.execute(client)

    res.status(200).json({ error: false, result, message: 'Client successfully created.' })
  }
}

export { ClientController }
