const axios = require('axios');

module.exports = {
  name: 'dolarblue',
  handle: (ctx) => {
    axios.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
      .then((response) => {
        const { casa: dolarBlue } = response.data.filter(({ casa }) => casa.nombre.trim().toLowerCase() === "dolar blue")[0]
        const result = `💸 Compra: ${dolarBlue.compra} 💸\n💸 Venta: ${dolarBlue.venta} 💸`;
        ctx.reply(result, { reply_to_message_id: ctx.message.message_id });
      }).catch((err) => {
        console.error(`Error fetching dollar info: `, err);
        ctx.reply('Algo salió mal 👎', { reply_to_message_id: ctx.message.message_id });
      });
  }
}