// import faker from '@faker-js/faker';

export default {
  user: {
    response: {
      id: 'id',
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
