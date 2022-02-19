import IUserSchema from './IUserSchema';

interface IUserWithId extends IUserSchema {
  id: string;
}

export default IUserWithId;
