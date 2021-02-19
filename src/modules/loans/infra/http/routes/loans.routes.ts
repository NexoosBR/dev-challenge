import { Router } from 'express';
import LoansController from '../controllers/LoansController';

const loansRouter = Router();
const loansController = new LoansController();

loansRouter.get('/:loanId', loansController.find);

loansRouter.post('/', loansController.create);

export default loansRouter;
