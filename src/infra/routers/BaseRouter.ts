import { Router } from 'express';

abstract class BaseRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
  }
}

export default BaseRouter;
