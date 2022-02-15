import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IUserService from '../../domains/application/service/IUserService';
import { IUserSchema } from '../../domains/data/schemas/user';

class UserController {
  private readonly service: IUserService;

  constructor(service: IUserService) {
    this.service = service;

    this.signin = this.signin.bind(this);
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async signin(req: Request<{}, {}, Pick<IUserSchema, 'email' | 'password'>>, res: Response) {
    const credentials = req.body;
    const user = await this.service.signin(credentials.email, credentials.password);
    res.status(StatusCodes.OK).json({ user });
  }

  public async create(req: Request<{}, {}, IUserSchema>, res: Response) {
    const user = req.body;
    const createdUser = await this.service.create(user);
    res.status(StatusCodes.CREATED).json({ user: createdUser });
  }

  public async find(_req: Request, res: Response) {
    const users = await this.service.find();
    res.status(StatusCodes.OK).json({ users });
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.service.findById(id);
    res.status(StatusCodes.OK).json({ user });
  }

  public async update(req: Request<{ id: string }, {}, Partial<IUserSchema>>, res: Response) {
    const { id } = req.params;
    const payload = req.body;
    const updatedUser = await this.service.update(id, payload);
    res.status(StatusCodes.OK).json({ user: updatedUser });
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await this.service.delete(id);
    res.status(StatusCodes.OK).json({ user: deletedUser });
  }
}

export default UserController;
