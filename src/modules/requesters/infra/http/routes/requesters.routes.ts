import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import RequestersController from '../controllers/RequestersController';
// import RequestersController from '../controllers/RequestersController';

const requestersRouter = Router();
const requestersController = new RequestersController();

requestersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      companyName: Joi.string().required(),
      cnpj: Joi.string().required(),
      addresses: Joi.array().items(Joi.string()),
      phones: Joi.array().items(Joi.string().min(10)),
    },
  }),
  requestersController.create,
);

requestersRouter.get('/:requesterId', requestersController.find);

export default requestersRouter;
