import authJWT from './helper/jwt.js'
import handlerError from './helper/error_handler.js'
import express from 'express'

function RegisterMiddlewares(app) {
  // Middlewares
  app.use(express.json());
  app.use(authJWT());
  app.use(handlerError);
}

export default RegisterMiddlewares