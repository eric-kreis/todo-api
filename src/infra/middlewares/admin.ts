import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RequestErrorBuilder } from '../../entities/builders';

const admin: RequestHandler = async (req, _res, next) => {
  try {
    if (req.user.role !== 'admin') {
      throw new RequestErrorBuilder(
        StatusCodes.UNAUTHORIZED,
        'only admins can access this route',
      );
    }
  } catch (e) {
    next(e);
  }
  next();
};

export default admin;
