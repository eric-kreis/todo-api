interface ITokenService {
  generate(payload: any): string;
  validate(token: string): any;
}

export default ITokenService;
