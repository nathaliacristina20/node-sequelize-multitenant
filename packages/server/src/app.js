import "dotenv/config";

import express from "express";
import cors from "cors";
import AppError from "./app/errors/AppError";
import "express-async-errors";
import http from "http";
import routes from './routes';

import './app/database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.midlewares();
    this.routes();
    this.exceptionHandler();
  }

  midlewares() {
    this.app.use(cors());
    // this.app.use(
    //     cors({
    //         origin: 'https://www.frontend.com.br',
    //     })
    // );
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    this.app.use((err, request, response, _) => {
      if (err instanceof AppError) {
        return response
          .status(err.statusCode)
          .json({ status: "error", message: err.message });
      }

      if (process.env.NODE_ENV === "development") {
        console.log("Erro", err);

        return response.status(500).json({
          status: "error",
          message: err,
        });
      }

      return response.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });
  }
}

export default new App().server;
