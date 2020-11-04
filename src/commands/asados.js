const { randomNumber } = require('../util/randomNumber');

const MAX_NUMBER = 3;

module.exports = {
  name: 'asados',
  handle: (ctx) => {
    ctx.replyWithPhoto({ source: `resources/images/asados/${randomNumber(MAX_NUMBER)}.jpg` })
  }
}