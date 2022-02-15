import IDefaultKeys from '../../IDefaultKeys';

interface ITaskSchema extends IDefaultKeys {
  text: string;
  status: string;
  userId: string;
}

export default ITaskSchema;
