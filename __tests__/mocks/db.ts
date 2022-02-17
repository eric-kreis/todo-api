import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connection = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  const connect = await new MongoClient(uri).connect();
  return connect;
};

export default connection;
