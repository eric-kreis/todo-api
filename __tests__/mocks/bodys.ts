import { ObjectId } from 'mongodb';
import { ITaskWithId } from '../../src/interfaces/data/schemas/task';
import { IUserWithId } from '../../src/interfaces/data/schemas/user';

interface IBodys {
  user: {
    response: IUserWithId & { createdAt: Date, updatedAt: Date }
    create: {
      name: string;
      email: string;
      password: string;
    },
  },
  task1: {
    create: {
      text: string;
    },
    response: ITaskWithId & { createdAt: Date, updatedAt: Date },
  },
  task2: {
    create: {
      text: string;
      status: string;
    },
    response: ITaskWithId & { createdAt: Date, updatedAt: Date },
  },
  task3: {
    create: {
      text: string;
      status: string;
    },
    response: ITaskWithId & { createdAt: Date, updatedAt: Date },
  },
  task4: {
    create: {
      text: string;
      status: string;
    },
    response: ITaskWithId & { createdAt: Date, updatedAt: Date },
  },
}

// NOTE: The tasks.response are not be able to use in task-model following my structure;

const bodys: IBodys = {
  user: {
    response: {
      id: new ObjectId().toString(),
      name: 'Eric',
      email: 'eric@email.com',
      password: '123456',
      role: 'common',
      createdAt: new Date('2022-02-15T23:35:45.767Z'),
      updatedAt: new Date('2022-02-15T23:35:45.767Z'),
    },
    create: {
      name: 'Eric',
      email: 'eric@email.com',
      password: '123456',
    },
  },
  task1: {
    create: {
      text: 'do deploy',
    },
    response: {
      id: new ObjectId().toString(),
      text: 'do deploy',
      status: 'todo',
      userId: new ObjectId().toString(),
      createdAt: new Date('2022-02-15T23:35:45.767Z'),
      updatedAt: new Date('2022-02-15T23:35:45.767Z'),
    },
  },
  task2: {
    create: {
      text: 'create front repository',
      status: 'todo',
    },
    response: {
      id: new ObjectId().toString(),
      text: 'create front repository',
      status: 'todo',
      userId: new ObjectId().toString(),
      createdAt: new Date('2022-02-15T23:35:45.767Z'),
      updatedAt: new Date('2022-02-15T23:35:45.767Z'),
    },
  },
  task3: {
    create: {
      text: 'back-end unit tests',
      status: 'doing',
    },
    response: {
      id: new ObjectId().toString(),
      text: 'back-end unit tests',
      status: 'doing',
      userId: new ObjectId().toString(),
      createdAt: new Date('2022-02-15T23:35:45.767Z'),
      updatedAt: new Date('2022-02-15T23:35:45.767Z'),
    },
  },
  task4: {
    create: {
      text: 'user unit tests',
      status: 'done',
    },
    response: {
      id: new ObjectId().toString(),
      text: 'user unit tests',
      status: 'done',
      userId: new ObjectId().toString(),
      createdAt: new Date('2022-02-15T23:35:45.767Z'),
      updatedAt: new Date('2022-02-15T23:35:45.767Z'),
    },
  },
};

export default bodys;
