const faltaEnvido = require('./faltaenvido');

module.exports = {
  name: 'noquiero',
  handle: (ctx) => {
    if (!faltaEnvido.status.isCantado) {
      ctx.reply('Nadie cantó la falta che.');
    } else {
      faltaEnvido.status.isCantado = false;
      faltaEnvido.status.username = undefined;
      ctx.reply('Se cagaron hasta las patas.');
    }
  }
}