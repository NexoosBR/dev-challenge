import { Joi } from 'celebrate'
import { ICreateCompanyRequestDTO } from './create-company.dto'

export const createCompanySchema = Joi.object<ICreateCompanyRequestDTO>().keys({
  companyName: Joi.string().min(2).max(100).required(),
  cnpj: Joi.string().length(14).required(),
  fullAddress: Joi.array().items(
    Joi.object().keys({
      address: Joi.string().max(50).required(),
      number: Joi.number().required(),
      complement: Joi.string().max(60).optional(),
      cep: Joi.string().max(9).required(),
      neighborhood: Joi.string().max(50).required(),
      city: Joi.string().max(50).required(),
      state: Joi.string().max(2).required()
    })).required(),
  telephone: Joi.array().items(
    Joi.object().keys({
      telephoneNumber: Joi.string()
    })).required()
})
