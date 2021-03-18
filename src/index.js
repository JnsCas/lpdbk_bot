const { Telegraf } = require('telegraf')
const commands = require('./commands');
const scheduler = require('./scheduler');
const { initDB, closeDB } = require('./db');

try {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  bot.start(async (ctx) => {
    await initDB(ctx);
    await ctx.reply('Hola! 😀')
  });
  bot.on('sticker', (ctx) => ctx.reply('👍'))
  commands(bot);
  scheduler(bot);
  await bot.launch();
} catch (e) {
  await closeDB();
  throw e;
}