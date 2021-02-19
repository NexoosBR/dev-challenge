import { Router } from 'express';
import LoanRequestsController from '../controllers/LoanRequestsController';

const loanRequestsRouter = Router();
const loanRequestsController = new LoanRequestsController();

loanRequestsRouter.get('/:loanRequestId', loanRequestsController.find);

loanRequestsRouter.post('/', loanRequestsController.create);

export default loanRequestsRouter;
