const friday = require('./friday');
const tigre = require('./tigre');
const fede = require('./fede');

module.exports = (bot) => {
  friday(bot);
  tigre(bot);
  fede(bot)
}