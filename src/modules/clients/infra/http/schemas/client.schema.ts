import { Joi } from 'celebrate'
import { IAddressDTO } from '../../../../../modules/adresses/dtos/address.dto'
import { IClientDTO } from '../../../../../modules/clients/dtos/client.dto'
import { IPhoneDTO } from '../../../../../modules/phones/dtos/phone.dto'

const phoneSchema = Joi.object<IPhoneDTO>().keys({
  phoneNumber: Joi.string().required()
})

const addressSchema = Joi.object<IAddressDTO>().keys({
  zipCode: Joi.string().required(),
  address: Joi.string().required(),
  addressNumber: Joi.number().required(),
  complement: Joi.string().optional().allow('', null),
  district: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required()
})

const clientSchema = Joi.object<IClientDTO>().keys({
  companyName: Joi.string().required(),
  cnpj: Joi.string().required(),
  address: Joi.array().items(addressSchema),
  phone: Joi.array().items(phoneSchema)
})

export { clientSchema }
