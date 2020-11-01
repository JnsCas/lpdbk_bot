const { Telegraf } = require('telegraf')
const commands = require('./commands');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome to LPDBK [BOT]'))
bot.help((ctx) => { 
    const helpMessage = '/asados - Fotos randoms de asados con los pibes\n' +
      '/dolaroficial - Cotización dolar oficial\n' +
      '/dolarblue - Cotización dolar blue\n' +
      '/dolarbolsa - Cotización dolar bolsa\n' +
      '/diego - Fotos randoms de D10S'
    ctx.reply(helpMessage) 
})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
commands(bot);
bot.launch()