import { Joi } from 'celebrate'
import { ILoanDTO } from '../../../../../modules/loans/dtos/loan.dto'

const loanParams = Joi.object().keys({ id: Joi.string().required() })

const creditRequestSchema = Joi.object<ILoanDTO>().keys({ creditRequestValue: Joi.string().required() })

export { creditRequestSchema, loanParams }
