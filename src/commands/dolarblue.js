const axios = require('axios');

module.exports = {
  name: 'dolarblue',
  handle: (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolarblue')
      .then((response) => {
        const result = `💸 Compra: ${response.data.compra} 💸\n💸 Venta: ${response.data.venta} 💸`;
        ctx.reply(result, { reply_to_message_id: ctx.message.message_id });
      }).catch((err) => {
        console.error(`Error fetching dollar info: `, err);
        ctx.reply('Algo salió mal 👎', { reply_to_message_id: ctx.message.message_id });
      });
  }
}