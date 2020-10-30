const { Telegraf } = require('telegraf')
const axios = require('axios');

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
  const MAX_NUMBER = 11;
  const randomNumber = Math.floor((Math.random() * MAX_NUMBER) + 1);
  ctx.replyWithPhoto({ source: `resources/images/diego/${randomNumber}.jpg` })
})
bot.launch()