import { celebrate, Segments } from 'celebrate'
import { Router } from 'express'

import { ClientController } from '../controllers/client.controller'
import { clientSchema } from '../schemas/client.schema'

const clientRouter = Router()

clientRouter.post('/', celebrate({ [Segments.BODY]: clientSchema }), (req, res) => { new ClientController().creatAndSave(req, res) })

export { clientRouter }
