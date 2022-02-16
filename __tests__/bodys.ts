import faker from '@faker-js/faker';

export default {
  user: {
    create: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  },
};
