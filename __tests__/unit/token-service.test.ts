import { TokenService } from '../../src/application/services';
import RequestErrorBuilder from '../../src/entities/builders/RequestErrorBuilder';
import bodys from '../bodys';

// System Under Testing factory;
const sutFactory = () => {
  const sut = new TokenService();
  return { sut };
};

const payload = bodys.user.create;
let token: string;

describe('TokenService.generate', () => {
  it('returns a string token', async () => {
    const { sut } = sutFactory();
    token = sut.generate(payload);

    expect(typeof token).toBe('string');
  });
});

describe('TokenService.validate', () => {
  it('throw the correct error if token doesn\'t exist', async () => {
    const { sut } = sutFactory();
    let error: any;

    try {
      sut.validate(undefined);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(RequestErrorBuilder);
    expect(error.status).toBe(401);
    expect(error.message).toBe('missign token');
  });

  it('throw the correct error if token isn\'t valid exist', async () => {
    const { sut } = sutFactory();
    let error: any;

    try {
      sut.validate('invalid token');
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(RequestErrorBuilder);
    expect(error.status).toBe(401);
    expect(error.message).toBe('invalid token');
  });

  it('if token is valid, returns the correct payload', async () => {
    const { sut } = sutFactory();
    let tokenPayload: any;

    try {
      tokenPayload = sut.validate(token);
    } catch (e) {
      tokenPayload = e;
    }

    const { exp, iat, ...rest } = tokenPayload;

    expect(rest).toStrictEqual(payload);
  });
});
