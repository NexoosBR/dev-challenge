import { Joi } from 'celebrate'

export const LoanOfferSchema = Joi.object().keys({ creditRequestId: Joi.string().length(36).required() })
