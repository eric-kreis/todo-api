import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITaskService } from '../../interfaces/application/service';
import { ITaskSchema } from '../../interfaces/data/schemas/task';
import { ITaskController } from '../../interfaces/infra';

class TaskService implements ITaskController {
  constructor(
    private readonly service: ITaskService,
  ) {
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findAllByUser = this.findAllByUser.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request<{}, {}, Omit<ITaskSchema, 'userId'>>, res: Response) {
    const { id: userId } = req.user;
    const task = req.body;
    const createdTask = await this.service.create({ ...task, userId });
    res.status(StatusCodes.CREATED).json({ task: createdTask });
  }

  public async find(_req: Request, res: Response) {
    const tasks = await this.service.find();
    res.status(StatusCodes.OK).json({ tasks });
  }

  // in the future i will implement a validation about who is requesting and what id is searching
  public async findAllByUser(req: Request, res: Response) {
    const { id: userId } = req.params;
    const tasks = await this.service.findAllByUser(userId);
    res.status(StatusCodes.OK).json({ tasks });
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const task = await this.service.findById(id);
    res.status(StatusCodes.OK).json({ task });
  }

  public async update(
    req: Request<{ [key: string]: string }, {}, Partial<ITaskSchema>>,
    res: Response,
  ) {
    const { id } = req.params;
    const payload = req.body;
    const updatedTask = await this.service.update(id, payload);
    res.status(StatusCodes.OK).json({ task: updatedTask });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedTask = await this.service.delete(id);
    res.status(StatusCodes.OK).json({ task: deletedTask });
  }
}

export default TaskService;
