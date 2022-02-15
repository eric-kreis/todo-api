import { RequestHandler, Router } from 'express';
import rescue from 'express-rescue';

/*
  === It was based on Tirtha Guha's pattern ===
  source: https://dev.to/tirthaguha/express-routes-with-builder-pattern-5f43
*/

type BuilderConstructorType = {
  router: Router,
  path: `/${string}`,
  method: 'post' | 'get' | 'put' | 'delete',
  middlewares?: RequestHandler[],
  controller: RequestHandler,
};

class RouteBuilder {
  private router: Router;

  private path: `/${string}`;

  private method: 'post' | 'get' | 'put' | 'delete';

  private middlewares: RequestHandler[] | [];

  private controller: RequestHandler;

  constructor({
    router,
    path,
    method,
    middlewares = [],
    controller,
  }: BuilderConstructorType) {
    this.router = router;
    this.path = path;
    this.middlewares = middlewares;
    this.method = method;
    this.controller = controller;
  }

  public build() {
    this.router[this.method](this.path, ...this.middlewares, rescue(this.controller));
  }
}

export default RouteBuilder;
