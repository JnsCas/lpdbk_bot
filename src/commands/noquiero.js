const faltaEnvido = require('./faltaenvido');

module.exports = {
  name: 'noquiero',
  handle: (ctx) => {
    const username = ctx.update.message.from.username || ctx.update.message.from.first_name;
    if (!faltaEnvido.status.isCantado) {
      ctx.reply('Nadie cantó la falta che.');
    } else if (username === faltaEnvido.status.username) {
      ctx.reply(`Escuchame una cosita ${username}, vos sos boludo?\nVos fuiste el que echó la falta!`); //FIXME
    } else {
      faltaEnvido.status.isCantado = false;
      faltaEnvido.status.username = undefined;
      ctx.reply('Se cagaron hasta las patas.');
    }
  }
}