const commands = [
  require('./dolarblue'),
  require('./dolarbolsa'),
  require('./dolaroficial'),
  require('./diego'),
  require('./asados'),
  require('./series')
]

module.exports = (bot) => {
  commands.forEach(c => bot.command(c.name, c.handle));
}