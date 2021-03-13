const { Telegraf } = require('telegraf')
const commands = require('./commands');
const scheduler = require('./scheduler');
const { initDB, closeDB } = require('./db');

const token = process.env.BOT_TOKEN;

try {
  const bot = new Telegraf(token);
  await initDB();
  bot.on('sticker', (ctx) => ctx.reply('👍'))
  commands(app);
  scheduler(app);
  bot.launch();
} finally {
  await closeDB();
}