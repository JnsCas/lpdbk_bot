const friday = require('./friday');
const tigre = require('./tigre');

module.exports = (bot) => {
  friday(bot);
  tigre(bot);
}