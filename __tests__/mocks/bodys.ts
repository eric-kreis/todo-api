import { ObjectId } from 'mongodb';
import { ITaskWithId } from '../../src/domains/data/schemas/task';
import { IUserWithId } from '../../src/domains/data/schemas/user';

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
      status: string;
    },
    response: ITaskWithId & { createdAt: Date, updatedAt: Date },
  },
  task2: {
    create: {
      text: string;
      status: string;
    },
  },
  task3: {
    create: {
      text: string;
      status: string;
    },
  },
  task4: {
    create: {
      text: string;
      status: string;
    },
  },
}

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
      status: 'todo',
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
  },
  task3: {
    create: {
      text: 'back-end unit tests',
      status: 'doing',
    },
  },
  task4: {
    create: {
      text: 'user unit tests',
      status: 'done',
    },
  },
};

export default bodys;
