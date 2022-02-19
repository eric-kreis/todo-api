import { RequestHandler } from 'express';

interface IUserController {
  signin: RequestHandler;
  create: RequestHandler;
  find: RequestHandler;
  findById: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}

export default IUserController;
