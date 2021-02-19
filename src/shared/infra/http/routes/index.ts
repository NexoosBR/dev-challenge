import { Router } from 'express';

import requestersRouter from '@modules/requesters/infra/http/routes/requesters.routes';
import loanRequestsRouter from '@modules/loans/infra/http/routes/loanRequests.routes';
import loansRouter from '@modules/loans/infra/http/routes/loans.routes';

const routes = Router();

routes.use('/requesters', requestersRouter);
routes.use('/loan-requests', loanRequestsRouter);
routes.use('/loans', loansRouter);

export default routes;
