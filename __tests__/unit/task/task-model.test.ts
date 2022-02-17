import { Db, MongoClient, ObjectId } from 'mongodb';
import { TaskModel } from '../../../src/data/models';
import { ITaskSchema } from '../../../src/domains/data/schemas/task';
import bodys from '../../mocks/bodys';
import connection from '../../mocks/db';
import encryptAndDecryptMock from '../../mocks/encryptDecrypt';

describe('TASK MODEL', () => {
  let connect: MongoClient;
  let db: Db;
  let sut: TaskModel;

  let userId: string;
  let task1Id: string;

  beforeAll(async () => {
    connect = await connection();
    db = connect.db();
    sut = new TaskModel(db);

    const { insertedId } = await db.collection('users').insertOne({
      ...bodys.user.create,
      password: encryptAndDecryptMock(bodys.user.create.password),
      role: 'common',
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    userId = insertedId.toString();

    await db.collection('tasks').insertMany([
      {
        ...bodys.task2.create,
        userId,
      },
      {
        ...bodys.task3.create,
        userId,
      },
      {
        ...bodys.task4.create,
        userId,
      },
    ]);
  });

  afterAll(async () => {
    await db.dropCollection('tasks');
    await db.dropDatabase();
    await connect.close();
  });

  it('Check if collection has only 3 tasks', async () => {
    const users = await db.collection('tasks').find().toArray();
    expect(users).toHaveLength(3);
  });

  describe('TaskModel.create', () => {
    it('should return the correct task with the correct userId', async () => {
      const createdTask = await sut.create({ ...bodys.task1.create, userId } as ITaskSchema);
      task1Id = createdTask.id;
      expect(createdTask).not.toBeNull();
      expect(createdTask).toMatchObject({ ...bodys.task1.create });
    });
  });

  describe('TaskModel.find', () => {
    it('should return users', async () => {
      const tasks = await sut.find();
      expect(tasks).toHaveLength(4);
      expect(tasks[3]).not.toBeNull();
      expect(tasks[3]).toMatchObject({ ...bodys.task1.create });
    });
  });

  describe('TaskModel.findAllByUser', () => {
    it('should return an empty array if called with invalid ID', async () => {
      const response = await sut.findAllByUser('id');
      expect(response).toHaveLength(0);
    });

    it('should return an empty array if user doesn\'t exist in DB', async () => {
      const response = await sut.findAllByUser(new ObjectId().toString());
      expect(response).toHaveLength(0);
    });

    it('should return the user if user exists in DB', async () => {
      const tasks = await sut.findAllByUser(userId);
      expect(tasks).toEqual(expect.arrayContaining([
        expect.objectContaining({ ...bodys.task1.create }),
        expect.objectContaining({ ...bodys.task2.create }),
        expect.objectContaining({ ...bodys.task3.create }),
        expect.objectContaining({ ...bodys.task4.create }),
      ]));
    });
  });

  describe('TaskModel.findById', () => {
    it('should return null if called with invalid ID', async () => {
      const response = await sut.findById('id');
      expect(response).toBeNull();
    });

    it('should return null if dont\'t found any task', async () => {
      const response = await sut.findById(new ObjectId().toString());
      expect(response).toBeNull();
    });

    it('should return the task if it was found in DB', async () => {
      const task = await sut.findById(task1Id);
      expect(task).toMatchObject({ ...bodys.task1.create });
    });
  });

  const newText = 'user endpoints';

  describe('TaskModel.update', () => {
    it('should return null if called with invalid ID', async () => {
      const response = await sut.update('id', { text: newText });
      expect(response).toBeNull();
    });

    it('should return null if DB does\'t have any task with the id', async () => {
      const response = await sut.update(new ObjectId().toString(), { text: newText });
      expect(response).toBeNull();
    });

    it('should return the updated task with id', async () => {
      const updatedUser = await sut.update(task1Id, { text: newText });
      expect(updatedUser).toMatchObject({ ...bodys.task1.create, text: newText });
    });
  });

  it('Check if task was updated', async () => {
    const updatedUserAfterUpdate = await db.collection('tasks').findOne(new ObjectId(task1Id));
    expect(updatedUserAfterUpdate).toMatchObject({ ...bodys.task1.create, text: newText });
  });

  describe('TaskModel.delete', () => {
    it('should return null if called with invalid ID', async () => {
      const response = await sut.delete('id');
      expect(response).toBeNull();
    });

    it('should return null if DB does\'t have any task with the id', async () => {
      const response = await sut.delete(new ObjectId().toString());
      expect(response).toBeNull();
    });

    it('should return the deleted task with id', async () => {
      const deletedUser = await sut.delete(task1Id);
      expect(deletedUser).toMatchObject({ ...bodys.task1.create, text: newText });
    });
  });

  it('Check if user was deleted', async () => {
    const deletedUserAfterDelete = await db.collection('tasks').findOne(new ObjectId(task1Id));
    expect(deletedUserAfterDelete).toBeNull();
  });
});
