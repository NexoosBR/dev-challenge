import { Joi } from 'celebrate'
import { ICreateCreditRequestDTO } from './create-credit-request.dto'

export const createCreditRequestSchema = Joi.object<ICreateCreditRequestDTO>().keys({
  companyId: Joi.string().length(36).required(),
  value: Joi.number().required()
})
