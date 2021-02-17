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
      address: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  requestersController.create,
);

export default requestersRouter;
