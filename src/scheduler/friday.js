const CronJob = require('cron').CronJob;

const EVERY_FRIDAY_AT_9_AM = '0 9 * * 5';

module.exports = (bot) => {
  const job = new CronJob(EVERY_FRIDAY_AT_9_AM, function() {
    bot.telegram.sendMessage(process.env.CHAT_ID, 'ARRRIIIIBA QUE HOY ES VIERNEEEEESSSS!! 😀😀\nLes mando un abrazo grande.\nEl Diegoton 😊');
  }, null, true, 'America/Argentina/Buenos_Aires');
  job.start();
}