import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import SessionController from "../app/controllers/SessionController";

const routes = new Router();

routes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  SessionController.store
);

export default routes;
