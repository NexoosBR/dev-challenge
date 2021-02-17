import { Router } from 'express';

import requestersRouter from '@modules/requesters/infra/http/routes/requesters.routes';

const routes = Router();

routes.use('/requesters', requestersRouter);

export default routes;
