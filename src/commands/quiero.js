const { faltaenvidoCollection } = require('../db');
const { randomNumberRange } = require('../util/randomNumber');

module.exports = {
  name: 'quiero',
  handle: async (ctx) => {
    const faltaenvidoRecord = await faltaenvidoCollection.find({ chatId: process.env.CHAT_ID }); //FIXME env
    if (!faltaenvidoRecord.cantadoBy) {
      ctx.reply('Nadie cantó la falta che.');
    } else {
      const usernameTo = ctx.update.message.from.username || ctx.update.message.from.first_name;
      if (usernameTo === faltaenvidoRecord.cantadoBy) {
        ctx.reply(`Escuchame una cosita ${usernameTo}, vos sos boludo?\nVos fuiste el que echó la falta!`); //FIXME
      } else {
        const tantoFrom = randomNumberRange(20, 33);
        const tantoTo = randomNumberRange(20, 33);
        const result = `Tantos de @${faltaenvidoRecord.cantadoBy}: ${tantoFrom}.\nTantos de @${usernameTo}: ${tantoTo}.\n\n`;
        if (tantoFrom === tantoTo) {
          ctx.reply(result + `@${faltaenvidoRecord.cantadoBy} ganó de mano.`);
        } else if (tantoFrom > tantoTo) {
          ctx.reply(result + `@${faltaenvidoRecord.cantadoBy} ganó.`);
        } else {
          ctx.reply(result + `@${usernameTo} ganó.`);
        }
        await faltaenvidoCollection.updateOne({ _id: faltaenvidoRecord._id, $set: { cantadoBy: undefined } });
      }
    }
  }
}