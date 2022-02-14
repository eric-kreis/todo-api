/*
  one day it will be:

  https://medium.com/@pkosiec/seeding-mongodb-database-the-right-way-32a8a0e75490
*/

import { Collection, Db, OptionalUnlessRequiredId } from 'mongodb';

abstract class SeedBase<TDocSchema> {
  protected readonly db: Db;

  public readonly collectionName: string;

  protected readonly collection: Collection<TDocSchema>;

  constructor(db: Db, collectionName: string) {
    this.db = db;
    this.collectionName = collectionName;
    this.collection = db.collection<TDocSchema>(collectionName);
  }

  protected async insert(documents: OptionalUnlessRequiredId<TDocSchema>[]) {
    try {
      await this.drop();
    } catch (e) {
      await this.db.createCollection(this.collectionName);
      await this.drop();
    }
    const { insertedCount } = await this.collection.insertMany(documents);
    if (insertedCount) {
      console.log(`
collection ${insertedCount} documents successfully inserted in ${this.collectionName} collection
${'='.repeat(64)}
`);
    }
  }

  protected async drop() {
    const droped = await this.collection.drop();
    if (droped) {
      console.log(`
=== ${this.collectionName} ===
collection ${this.collectionName} successfully droped`);
    }
  }
}

export default SeedBase;
