import { Router } from 'express';
import { ITaskController } from '../../domains/infra';
import { RouteBuilder } from '../../entities/builders';
import { auth } from '../middlewares';
import BaseRouter from './BaseRouter';

class TaskRouter extends BaseRouter {
  public router: Router;

  constructor(private controller: ITaskController) {
    super();
    this.router = this.handle();
  }

  private handle() {
    const routes = [
      this.postTask(),
      this.getTasks(),
      this.getTasksById(),
      this.getTasksByUser(),
      this.putTask(),
      this.deleteTask(),
    ];
    routes.forEach((route) => route.build());
    return this.router;
  }

  private postTask() {
    return new RouteBuilder({
      router: this.router,
      path: '/',
      middlewares: [auth],
      method: 'post',
      controller: this.controller.create,
    });
  }

  private getTasks() {
    return new RouteBuilder({
      router: this.router,
      path: '/',
      middlewares: [auth],
      method: 'get',
      controller: this.controller.find,
    });
  }

  private getTasksById() {
    return new RouteBuilder({
      router: this.router,
      path: '/:id',
      method: 'get',
      controller: this.controller.findById,
    });
  }

  private getTasksByUser() {
    return new RouteBuilder({
      router: this.router,
      path: '/user/:id',
      middlewares: [auth],
      method: 'get',
      controller: this.controller.findAllByUser,
    });
  }

  private putTask() {
    return new RouteBuilder({
      router: this.router,
      path: '/:id',
      middlewares: [auth],
      method: 'put',
      controller: this.controller.update,
    });
  }

  private deleteTask() {
    return new RouteBuilder({
      router: this.router,
      path: '/:id',
      middlewares: [auth],
      method: 'delete',
      controller: this.controller.delete,
    });
  }
}

export default TaskRouter;
