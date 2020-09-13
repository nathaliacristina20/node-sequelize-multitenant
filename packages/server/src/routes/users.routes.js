import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import UserController from "../app/controllers/UserController";
const routes = new Router();

routes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.store
);

export default routes;
