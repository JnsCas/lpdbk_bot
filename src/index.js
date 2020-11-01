const { Telegraf } = require('telegraf')
const axios = require('axios');
const fs = require('fs');

async function writeResult(arrayToWrite) {
  const data = JSON.stringify(arrayToWrite);
  fs.writeFile(__dirname + '/../resources/lists/series.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('Series data saved.');
  });
}

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
bot.command('asados', (ctx) => {
    const MAX_NUMBER = 3;
    const randomNumber = Math.floor((Math.random() * MAX_NUMBER) + 1);
    ctx.replyWithPhoto({ source: `resources/images/asados/${randomNumber}.jpg` })
})
bot.command('dolarblue', (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolarblue')
        .then((response) => {
            const result = `DOLAR BLUE:\n\nCompra: ${response.data.compra}\nVenta: ${response.data.venta}`
            ctx.reply(result)
        })
})
bot.command('dolaroficial', (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolaroficial')
        .then((response) => {
            const result = `DOLAR OFICIAL:\n\nCompra: ${response.data.compra}\nVenta: ${response.data.venta}`
            ctx.reply(result)
        })
})
bot.command('dolarbolsa', (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolarbolsa')
        .then((response) => {
            const result = `DOLAR BOLSA:\n\nCompra: ${response.data.compra}\nVenta: ${response.data.venta}`
            ctx.reply(result)
        })
})
bot.command('diego', (ctx) => {
  const MAX_NUMBER = 36;
  const randomNumber = Math.floor((Math.random() * MAX_NUMBER) + 1);
  ctx.replyWithPhoto({ source: `resources/images/diego/${randomNumber}.jpg` })
})
bot.command('series', async (ctx) => {
  const seriesArray = require('../resources/lists/series.json');
  const messageTextSplited = ctx.update.message.text.split(' ');
  const parameters = messageTextSplited.slice(1, messageTextSplited.length);
  if (parameters.length > 1) {
    const firstParameter = parameters[0];
    const secondParameter = parameters.slice(1 , parameters.length).join(' ');
    switch (firstParameter) {
      case 'add':
      case 'agregar':
        await writeResult(seriesArray.push(secondParameter));
        break;

      case 'delete':
      case 'eliminar':
        const indexToDelete = Number(secondParameter) - 1;
        if (indexToDelete > seriesArray.length || indexToDelete < 1) {
          return;
        }
        await writeResult(seriesArray.splice(indexToDelete, 1));
        break;
    }
  }

  const result = seriesArray.map((serie, index) => `${index + 1}) ${serie}`).join('\n');
  ctx.reply(result);
});
bot.launch()