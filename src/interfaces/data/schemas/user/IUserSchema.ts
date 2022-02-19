import IDefaultKeys from '../../IDefaultKeys';

interface IUserSchema extends IDefaultKeys {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default IUserSchema;
