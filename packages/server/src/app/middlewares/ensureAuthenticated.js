import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "../../config/auth";
import AppError from "../errors/AppError";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    throw new AppError("Invalid JWT token", 401);
  }
};
