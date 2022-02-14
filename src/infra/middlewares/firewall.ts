// source: https://cheatcode.co/tutorials/how-to-implement-secure-httponly-cookies-in-node-js-with-express;

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const safeRequest: RequestHandler = (req, res, next) => {
  const allowedMethods = [
    'OPTIONS',
    'HEAD',
    'CONNECT',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
  ];

  if (!allowedMethods.includes(req.method)) {
    res.status(StatusCodes.METHOD_NOT_ALLOWED).send(`${req.method} not allowed.`);
  }

  next();
};

export default safeRequest;
