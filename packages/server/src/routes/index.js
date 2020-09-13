import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import teamsRouter from './teams.routes';
import invitesRouter from './invites.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/teams', teamsRouter);
routes.use('/invites', invitesRouter);

export default routes;
