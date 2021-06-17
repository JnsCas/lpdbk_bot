const { MongoClient } = require("mongodb");
const { collectionsData } = require('./collections');

const userDB = process.env.USER_DB;
const passwordDB = process.env.PASSWORD_DB;
const clusterUrlDB = process.env.CLUSTER_URL_DB;

const uri = `mongodb+srv://${userDB}:${passwordDB}@${clusterUrlDB}`;

let database,
  client,
  collections = {};

const connectDatabase = async () => {
  client = new MongoClient(uri);
  await client.connect();
  database = client.db('lpdbk_bot');
}

module.exports = {

  initDB: async (ctx) => {

    try {
      await connectDatabase();

      const chatId = ctx.message.chat.id;

      const initCollection = async (nameCollection, defaultData) => {
        const collection = await database.collection(nameCollection);

        //insert if chatId does not exist
        await collection.updateOne(
          { chatId: chatId },
          { $setOnInsert: { chatId, ...defaultData, createdAt: new Date() } },
          { upsert: true }
        );

        return collection;
      };

      for (const collectionData of collectionsData) {
        collections[collectionData.name] = await initCollection(collectionData.name, collectionData.defaultData);
      }

    } catch (e) {
      console.error('Error initializing database', e);
      throw e;
    }
  },

  closeDB: async () => {
    if (client) {
      await client.close();
    }
  },

  getCollectionByName: async (name) => {
    if (Object.keys(collections).length !== 0) {
      return collections[name];
    }

    if (!database) {
      await connectDatabase();
      for (const collectionData of collectionsData) {
        collections[collectionData.name] = await database.collection(collectionData.name);
      }
      return collections[name];
    }
  }

};