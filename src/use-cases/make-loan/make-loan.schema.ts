import { Joi } from 'celebrate'
import { IMakeLoanRequestDTO } from './make-loan.dto'

export const makeLoanSchema = Joi.object<IMakeLoanRequestDTO>().keys({
  loanId: Joi.string().length(36).required()
})
