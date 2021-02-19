import { Router } from 'express';
import LoanSimulationController from '../controllers/LoanSimulationController';

const loanSimulationRouter = Router();

const loanSimulationController = new LoanSimulationController();

loanSimulationRouter.post('/', loanSimulationController.create);

export default loanSimulationRouter;
