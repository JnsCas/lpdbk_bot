const axios = require('axios');

module.exports = {
  name: 'dolarbolsa',
  handle: (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolarbolsa')
      .then((response) => {
        const result = `DOLAR BOLSA:\n\nCompra: ${response.data.compra}\nVenta: ${response.data.venta}`
        ctx.reply(result)
      });
  }
}