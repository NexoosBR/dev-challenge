import { Router } from 'express';

import requestersRouter from '@modules/requesters/infra/http/routes/requesters.routes';
import loanRequestsRouter from '@modules/loans/infra/http/routes/loanRequests.routes';
import loansRouter from '@modules/loans/infra/http/routes/loans.routes';
import loanSimulationRouter from '@modules/loans/infra/http/routes/loanSimulations.routes';

const routes = Router();

routes.use('/requesters', requestersRouter);
routes.use('/loan-requests', loanRequestsRouter);
routes.use('/loans', loansRouter);
routes.use('/loan-simulation', loanSimulationRouter);

export default routes;
