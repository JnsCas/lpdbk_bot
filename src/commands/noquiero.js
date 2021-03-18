const { getCollectionByName } = require('../db');

module.exports = {
  name: 'noquiero',
  handle: async (ctx) => {
    const faltaenvidoRecord = await getCollectionByName('falta-envido').find({ chatId: ctx.message.chat.id });
    const username = ctx.update.message.from.username || ctx.update.message.from.first_name;
    if (!faltaenvidoRecord.cantadoBy) {
      ctx.reply('Nadie cantó la falta che.');
    } else if (username === faltaenvidoRecord.cantadoBy) {
      ctx.reply(`Vos fuiste el que echó la falta @${username}!`);
    } else {
      await faltaenvidoCollection.updateOne({ _id: faltaenvidoRecord._id, $set: { cantadoBy: undefined } });
      ctx.reply('Se cagaron hasta las patas.');
    }
  }
}