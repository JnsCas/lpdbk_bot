const { Telegraf } = require('telegraf')
const commands = require('./commands');
const scheduler = require('./scheduler');
const { initDB, closeDB } = require('./db');
const initOn = require('./on');

try {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start(async (ctx) => {
    await initDB(ctx);
    await ctx.reply('Hola! 😀')
  });
  commands(bot);
  scheduler(bot);
  initOn(bot);
  bot.launch();
} catch (e) {
  closeDB();
  throw e;
}