import { StatusCodes } from 'http-status-codes';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import ITokenService from '../../domains/application/service/ITokenService';
import RequestErrorBuilder from '../../entities/builders/RequestErrorBuilder';

const { JWT_SECRET = 'superSecret2' } = process.env;

class TokenService implements ITokenService {
  private sign: typeof sign;

  private verify: typeof verify;

  private secret: string;

  private options: SignOptions;

  constructor() {
    this.sign = sign;
    this.verify = verify;
    this.secret = JWT_SECRET;
    this.options = { algorithm: 'HS256', expiresIn: '3d' };

    this.generate = this.generate.bind(this);
    this.validate = this.validate.bind(this);
  }

  public generate(payload: any) {
    return this.sign(payload, this.secret, this.options);
  }

  public validate(token: string | undefined) {
    if (!token) {
      throw new RequestErrorBuilder(StatusCodes.UNAUTHORIZED, 'missign token');
    }

    try {
      const payload = this.verify(token, this.secret);
      return payload;
    } catch (e) {
      throw new RequestErrorBuilder(StatusCodes.UNAUTHORIZED, 'invalid token');
    }
  }
}

export default TokenService;
