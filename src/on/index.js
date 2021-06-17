const onList = [
  require('./photo')
];

module.exports = (bot) => {
  onList.forEach(o => bot.on(o.name, o.handle));
};