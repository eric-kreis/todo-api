import { Router } from 'express';
import { IUserController } from '../../domains/infra';
import { RouteBuilder } from '../../entities/builders';
import { auth } from '../middlewares';
import BaseRouter from './BaseRouter';

class UserRouter extends BaseRouter {
  private controller: IUserController;

  public router: Router;

  constructor(controller: IUserController) {
    super();
    this.controller = controller;
    this.router = this.handle();
  }

  private handle() {
    const routes = [
      this.signinUser(),
      this.postUser(),
      this.getUsers(),
      this.getUserById(),
      this.putUser(),
      this.deleteUser(),
    ];
    routes.forEach((route) => route.build());
    return this.router;
  }

  private signinUser() {
    return new RouteBuilder({
      router: this.router,
      path: '/signin',
      method: 'post',
      controller: this.controller.signin,
    });
  }

  private postUser() {
    return new RouteBuilder({
      router: this.router,
      path: '/',
      method: 'post',
      controller: this.controller.create,
    });
  }

  private getUsers() {
    return new RouteBuilder({
      router: this.router,
      path: '/',
      middlewares: [auth],
      method: 'get',
      controller: this.controller.find,
    });
  }

  private getUserById() {
    return new RouteBuilder({
      router: this.router,
      path: '/:id',
      method: 'get',
      controller: this.controller.findById,
    });
  }

  private putUser() {
    return new RouteBuilder({
      router: this.router,
      path: '/:id',
      middlewares: [auth],
      method: 'put',
      controller: this.controller.update,
    });
  }

  private deleteUser() {
    return new RouteBuilder({
      router: this.router,
      path: '/:id',
      middlewares: [auth],
      method: 'delete',
      controller: this.controller.delete,
    });
  }
}

export default UserRouter;
