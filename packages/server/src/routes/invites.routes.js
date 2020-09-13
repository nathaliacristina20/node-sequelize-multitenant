import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import InviteController from '../app/controllers/InviteController';

import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';
import teamAuthenticated from '../app/middlewares/teamAuthenticated';

const routes = new Router();

routes.use(ensureAuthenticated);
routes.use(teamAuthenticated);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      invites: Joi.array().required(),
    },
  }),
  InviteController.store
);

export default routes;
