const { getCollectionByName } = require('../db');
const { getMessageParameters } = require('../util/messageParameters');

module.exports = {
  name: 'series',
  handle: async (ctx) => {
    const seriesCollection = await getCollectionByName('series');
    const seriesRecord = await seriesCollection.findOne({ chatId: ctx.message.chat.id });
    const parameters = getMessageParameters(ctx);

    let names = seriesRecord.names;
    if (parameters.hasSecondParameter) {
      switch (parameters.first) {
        case 'add':
        case 'agregar':
          const recordUpdated = await seriesCollection.findOneAndUpdate(
            { _id: seriesRecord._id },
            { $push: { names: parameters.second } },
            { returnOriginal: false }
          );
          names = recordUpdated.value.names;
          break;

        case 'delete':
        case 'eliminar':
          const indexToDelete = Number(parameters.second) - 1;
          if (indexToDelete > seriesRecord.names.length || indexToDelete < 0) {
            return;
          }
          seriesRecord.names.splice(indexToDelete, 1);
          await seriesCollection.updateOne(
            { _id: seriesRecord._id },
            { $set: { names: seriesRecord.names } }
          );
          names = seriesRecord.names;
          break;
      }
    }

    const result = names.map((serie, index) => `${index + 1}) ${serie}`).join('\n') || 'No tengo series para recomendarte.';
    ctx.reply(result);
  }
}