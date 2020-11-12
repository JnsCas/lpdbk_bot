const { randomNumber } = require('../util/randomNumber');
const MAX_NUMBER = 53;

module.exports = {
  name: 'diego',
  handle: (ctx) => {
    ctx.replyWithPhoto({ source: `resources/images/diego/${randomNumber(MAX_NUMBER)}.jpg` })
  }
}