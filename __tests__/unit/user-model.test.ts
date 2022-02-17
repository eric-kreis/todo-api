import { Db, MongoClient, ObjectId } from 'mongodb';
import { UserModel } from '../../src/data/models';
import bodys from '../mocks/bodys';
import connection from '../mocks/db';
import encryptAndDecryptMock from '../mocks/encryptDecrypt';

const dbUser = {
  ...bodys.user.create,
  password: encryptAndDecryptMock(bodys.user.create.password),
  role: 'common',
};

describe('USER MODEL', () => {
  let connect: MongoClient;
  let db: Db;
  let sut: UserModel;
  let userId: string;

  beforeAll(async () => {
    connect = await connection();
    db = connect.db();
    sut = new UserModel(db, encryptAndDecryptMock, encryptAndDecryptMock);
  });

  afterAll(async () => {
    await db.dropCollection('users');
    await db.dropDatabase();
    await connect.close();
  });

  it('Check if collection is empty', async () => {
    const users = await db.collection('users').find().toArray();
    expect(users).toHaveLength(0);
  });

  describe('UserModel.create', () => {
    it('should return the correct user with role and encrypted password', async () => {
      const createdUser = await sut.create(bodys.user.create);
      userId = createdUser.id;
      expect(createdUser).not.toBeNull();
      expect(createdUser).toMatchObject(dbUser);
    });
  });

  describe('UserModel.find', () => {
    it('should return users', async () => {
      const users = await sut.find();
      expect(users).toHaveLength(1);
      expect(users[0]).not.toBeNull();
      expect(users[0]).toMatchObject(dbUser);
    });
  });

  describe('UserModel.findByEmail', () => {
    it('should return null if user doesn\'t exist in DB', async () => {
      const response = await sut.findByEmail('mike@email.com');
      expect(response).toBeNull();
    });

    it('should return the user if user exists in DB', async () => {
      const user = await sut.findByEmail('eric@email.com');
      expect(user).toMatchObject(dbUser);
    });
  });

  describe('UserModel.findByCredentials', () => {
    it('should return null if dont\'t found any user', async () => {
      const response = await sut.findByCredentials('mike@email.com', 'password');
      expect(response).toBeNull();
    });

    it('should return the user if find a user in DB', async () => {
      const user = await sut.findByCredentials('eric@email.com', '123456');
      expect(user).toMatchObject(dbUser);
    });
  });

  describe('UserModel.findById', () => {
    it('should return null if called with invalid ID', async () => {
      const response = await sut.findById('id');
      expect(response).toBeNull();
    });

    it('should return null if DB does\'t have any user with the id', async () => {
      const response = await sut.findById(new ObjectId().toString());
      expect(response).toBeNull();
    });

    it('should return the user with id', async () => {
      const user = await sut.findById(userId);
      expect(user).toMatchObject(dbUser);
    });
  });

  const newEmail = 'soso@email.com';

  describe('UserModel.update', () => {
    it('should return null if called with invalid ID', async () => {
      const response = await sut.update('id', bodys.user.create);
      expect(response).toBeNull();
    });

    it('should return null if DB does\'t have any user with the id', async () => {
      const response = await sut.update(new ObjectId().toString(), bodys.user.create);
      expect(response).toBeNull();
    });

    it('should return the updated user with id', async () => {
      const updatedUser = await sut.update(userId, { email: newEmail });
      expect(updatedUser).toMatchObject({ ...dbUser, email: newEmail });
    });
  });

  it('Check if user was updated', async () => {
    const updatedUserAfterUpdate = await sut.findById(userId);
    expect(updatedUserAfterUpdate).toMatchObject({ ...dbUser, email: newEmail });
  });

  describe('UserModel.delete', () => {
    it('should return null if called with invalid ID', async () => {
      const response = await sut.delete('id');
      expect(response).toBeNull();
    });

    it('should return null if DB does\'t have any user with the id', async () => {
      const response = await sut.delete(new ObjectId().toString());
      expect(response).toBeNull();
    });

    it('should return the deleted user with id', async () => {
      const deletedUser = await sut.delete(userId);
      expect(deletedUser).toMatchObject({ ...dbUser, email: newEmail });
    });
  });

  it('Check if user was deleted', async () => {
    const deletedUserAfterDelete = await sut.findById(userId);
    expect(deletedUserAfterDelete).toBeNull();
  });
});
