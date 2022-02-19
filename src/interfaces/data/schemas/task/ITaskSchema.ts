import IDefaultKeys from '../../IDefaultKeys';

interface ITaskSchema extends IDefaultKeys {
  text: string;
  status: 'todo' | 'doing' | 'done';
  userId: string;
}

export default ITaskSchema;
