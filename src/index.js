const { Telegraf } = require('telegraf')
const axios = require('axios');

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome to LPDBK [BOT]'))
bot.help((ctx) => { 
    const helpMessage = '/asados Fotos randoms de asados con los pibes\n/dolaroficial Cotizacion dolar oficial\n/dolarblue Cotizacion dolar blue'
    ctx.reply(helpMessage) 
})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('asados', (ctx) => {
    const MAX_NUMBER = 3;
    const randomNumber = Math.floor((Math.random() * MAX_NUMBER) + 1);
    ctx.replyWithPhoto({ source: `resources/images/${randomNumber}.jpg` })
})
bot.command('dolarblue', (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolarblue')
        .then((response) => {
            console.log(response)
            const result = `Compra: ${response.data.compra}\nVenta: ${response.data.venta}`
            ctx.reply(result)
        })
})
bot.command('dolaroficial', (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolaroficial')
        .then((response) => {
            console.log(response)
            const result = `Compra: ${response.data.compra}\nVenta: ${response.data.venta}`
            ctx.reply(result)
        })
})
bot.command('dolarbolsa', (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolarbolsa')
        .then((response) => {
            console.log(response)
            const result = `Compra: ${response.data.compra}\nVenta: ${response.data.venta}`
            ctx.reply(result)
        })
})
bot.launch()