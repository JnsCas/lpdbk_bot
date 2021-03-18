const { MongoClient } = require("mongodb");
const { collectionsData } = require('./collections');

let client,
  database,
  collections = {};

module.exports = {

  initDB: async (ctx) => {
    const userDB = process.env.USER_DB;
    const passwordDB = process.env.PASSWORD_DB;
    const clusterUrlDB = process.env.CLUSTER_URL_DB;

    const uri = `mongodb+srv://${userDB}:${passwordDB}@${clusterUrlDB}`;

    client = new MongoClient(uri);

    try {
      await client.connect();
      database = client.db('lpdbk_bot');

      const chatId = ctx.message.chat.id;

      const initCollection = async (nameCollection, defaultData) => {
        const collection = await database.collection(nameCollection);

        //insert if chatId does not exist
        await collection.updateOne(
          { chatId: chatId },
          { $setOnInsert: { chatId, ...defaultData, createdAt: Date.now() } },
          { upsert: true }
        );

        return collection;
      };

      for (const collectionData of collectionsData) {
        collections[collectionData.name] = await initCollection(collectionData.name, collectionData.defaultData);
      }

    } catch (e) {
      console.log('Error initializing database', e);
      throw e;
    }
  },

  closeDB: async () => {
    if (client) {
      await client.close();
    }
  },

  getCollectionByName: (name) => collections[name]

};