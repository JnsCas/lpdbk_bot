const commands = [
  require('./dolarblue'),
  require('./dolarbolsa'),
  require('./dolaroficial'),
  require('./diego'),
  require('./asados'),
  require('./series'),
  require('./faltaenvido'),
  require('./quiero'),
  require('./noquiero'),
  require('./todos'),
  require('./send'),
  require('./subirfoto')
]

module.exports = (bot) => {
  commands.forEach(c => bot.command(c.name, c.handle));
}