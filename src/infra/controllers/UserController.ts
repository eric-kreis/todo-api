import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUserService, ITokenService } from '../../domains/application/service';
import { IUserSchema } from '../../domains/data/schemas/user';
import { IUserController } from '../../domains/infra';

class UserController implements IUserController {
  private readonly service: IUserService;

  private readonly tokenService: ITokenService;

  constructor(service: IUserService, tokenService: ITokenService) {
    this.service = service;
    this.tokenService = tokenService;

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
    const token = this.tokenService.generate({ id: user.id, email: user.email, role: user.role });
    res.status(StatusCodes.OK).json({ token });
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

  public async update(
    req: Request<{ [key: string]: string }, {}, Partial<IUserSchema>>,
    res: Response,
  ) {
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
