import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: keyof typeof models, collectionName: string): Promise<void> => {
  try {
    const model = models[modelName];
    if (!model || !model.db || !model.db.db) {
      throw new Error(`Model ${modelName} does not exist or does not have a valid 'db' property.`);
    }

    const collections = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      console.log(`Dropping collection: ${collectionName}`);
      await db.dropCollection(collectionName);
    } else {
      console.log(`Collection ${collectionName} does not exist.`);
    }
  } catch (err) {
    console.error('Error in cleanDb:', err);
    throw err;
  }
};