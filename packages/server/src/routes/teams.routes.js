import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import TeamController from '../app/controllers/TeamController';
import ensureAuthenticated from '../app/middlewares/ensureAuthenticated';

const routes = new Router();

routes.use(ensureAuthenticated);

routes.get('/', TeamController.index);
routes.get('/:id', TeamController.show);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  TeamController.store
);
routes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  TeamController.update
);

routes.delete('/:id', TeamController.delete);

export default routes;
