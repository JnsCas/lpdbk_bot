const { Telegraf } = require('telegraf')
const commands = require('./commands');
const scheduler = require('./scheduler');
const { initDB, closeDB } = require('./db');

const token = process.env.BOT_TOKEN;

try {
  const bot = new Telegraf(token);
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