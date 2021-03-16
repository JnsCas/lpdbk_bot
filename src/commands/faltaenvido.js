const phrases = require('../../resources/lists/faltaenvido.json'); //TODO delete this file
const { getCollectionByName } = require('../db');
const { randomNumber } = require('../util/randomNumber');

module.exports = {
  name: 'faltaenvido',
  handle: async (ctx) => {
    const helpMessage = '\n\nPara contestar usa los comandos /quiero ó /noquiero.'

    const faltaenvidoRecord = await getCollectionByName('falta-envido').find({ chatId: ctx.message.chat.id });
    if (faltaenvidoRecord.cantadoBy) {
      ctx.reply(`La falta ya está cantada por ${faltaenvidoRecord.cantadoBy}.${helpMessage}`);
    } else {
      const usernameFrom = ctx.update.message.from.username || ctx.update.message.from.first_name;
      const phrase = faltaenvidoRecord.phrases[randomNumber(faltaenvidoRecord.phrases.length) - 1];
      ctx.reply(`FALTA ENVIDOOOO CHEEEE\n${phrase.replace('%s', usernameFrom)}${helpMessage}`);

      await faltaenvidoCollection.updateOne({ _id :faltaenvidoRecord._id, $set: { cantadoBy: usernameFrom } });
    }
  }
}