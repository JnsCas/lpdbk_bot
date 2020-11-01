const axios = require('axios');

module.exports = {
  name: 'dolaroficial',
  handle: (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolaroficial')
      .then((response) => {
        const result = `DOLAR OFICIAL:\n\nCompra: ${response.data.compra}\nVenta: ${response.data.venta}`
        ctx.reply(result)
      });
  }
}