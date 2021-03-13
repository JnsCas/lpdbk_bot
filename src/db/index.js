const { MongoClient } = require("mongodb");

let client,
  database;

const getCollectionByName = async (name) => {
  if (!database) {
    throw new Error('Error to get the collection. The database is not initialized.');
  }
  return await database.collection(name);
};

module.exports = {

  initDB: async () => {
    const userDB = process.env.USER_DB;
    const passwordDB = process.env.PASSWORD_DB;
    const clusterUrlDB = process.env.CLUSTER_URL_DB;

    const uri = `mongodb+srv://${userDB}:${passwordDB}@${clusterUrlDB}`;

    client = new MongoClient(uri);

    try {
      await client.connect();
      database = client.db('lpdbk_bot');
      //FIXME init collections

    } catch (e) {
      console.log('Error connecting to database', e);
      throw e;
    }
  },

  closeDB: async () => {
    if (client) {
      await client.close();
    }
  },

  faltaenvidoCollection: await getCollectionByName('falta-envido'),
  quieroCollection: await getCollectionByName('quiero'),
  noquieroCollection: await getCollectionByName('no-quiero'),
  seriesCollection: await getCollectionByName('series'),
  todosCollection: await getCollectionByName('todos')
};