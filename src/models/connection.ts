import { Db, MongoClient } from 'mongodb';

const { DATABASE_URL } = process.env;

const client = new MongoClient(DATABASE_URL);

let db: null | Db = null;

const connection = async (): Promise<Db> => {
  try {
    db = db || (db = (await client.connect()).db());

    return db;
  } catch (e: any) {
    console.error(e.message);
    process.exit(1);
  }
};

export default connection;
