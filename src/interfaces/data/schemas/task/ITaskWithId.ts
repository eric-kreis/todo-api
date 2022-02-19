import ITaskSchema from './ITaskSchema';

interface TaskWithId extends ITaskSchema {
  id: string;
}

export default TaskWithId;
