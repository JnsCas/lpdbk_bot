const faltaEnvido = require('./faltaenvido');
const { randomNumberRange } = require('../util/randomNumber');

module.exports = {
  name: 'quiero',
  handle: (ctx) => {
    if (!faltaEnvido.status.isCantado) {
      ctx.reply('Nadie cantó la falta che.');
    } else {
      const usernameTo = ctx.update.message.from.username || ctx.update.message.from.first_name;
      if (usernameTo === faltaEnvido.status.username) {
        ctx.reply(`Escuchame una cosita ${usernameTo}, vos sos boludo?\nVos fuiste el que echó la falta!`); //FIXME
      } else {
        const tantoFrom = randomNumberRange(20, 33);
        const tantoTo = randomNumberRange(20, 33);
        const result = `Tantos de @${faltaEnvido.status.username}: ${tantoFrom}.\nTantos de @${usernameTo}: ${tantoTo}.\n\n`;
        if (tantoFrom === tantoTo) {
          ctx.reply(result + `@${faltaEnvido.status.username} ganó de mano.`);
        } else if (tantoFrom > tantoTo) {
          ctx.reply(result + `@${faltaEnvido.status.username} ganó.`);
        } else {
          ctx.reply(result + `@${usernameTo} ganó.`);
        }
        faltaEnvido.status.isCantado = false;
        faltaEnvido.status.username = undefined;
      }
    }
  }
}