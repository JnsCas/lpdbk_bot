const { Telegraf } = require('telegraf')
const commands = require('./commands');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome to LPDBK [BOT]'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
commands(bot);
bot.launch()