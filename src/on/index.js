const onList = [
  require('./photo'),
  require('./sticker')
];

module.exports = (bot) => {
  onList.forEach(o => bot.on(o.name, o.handle));
};