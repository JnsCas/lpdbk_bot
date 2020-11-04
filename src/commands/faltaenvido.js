const phrases = require('../../resources/lists/faltaenvido.json');
const { randomNumber } = require('../util/randomNumber');

let status = {
  isCantado: false,
  username: undefined
};

module.exports = {
  name: 'faltaenvido',
  handle: (ctx) => {
    const helpMessage = '\n\nPara contestar usa los comandos /quiero ó /noquiero.'
    if (status.isCantado) {
      ctx.reply(`La falta ya está cantada por ${status.username}.${helpMessage}`);
    } else {
      const usernameFrom = ctx.update.message.from.username || ctx.update.message.from.first_name;
      status.isCantado = true;
      status.username = usernameFrom;
      const phrase = phrases[randomNumber(phrases.length) - 1];
      const result = "FALTA ENVIDOOOO CHEEEE\n" + phrase.replace('%s', usernameFrom) + helpMessage;
      ctx.reply(result);
    }
  },
  status
}