import dayjs from 'dayjs';
import { CookieOptions } from 'express';

const { NODE_ENV = 'development' } = process.env;

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  expires: dayjs().add(5, 'days').toDate(),
};

export default cookieOptions;
