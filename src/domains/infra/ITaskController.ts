import { RequestHandler } from 'express';

interface ITaskController {
  create: RequestHandler;
  find: RequestHandler;
  findAllByUser: RequestHandler;
  findById: RequestHandler;
  update: RequestHandler;
  delete: RequestHandler;
}

export default ITaskController;
