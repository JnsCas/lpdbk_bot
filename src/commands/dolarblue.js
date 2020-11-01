const axios = require('axios');

module.exports = {
  name: 'dolarblue',
  handle: (ctx) => {
    axios.get('https://api-dolar-argentina.herokuapp.com/api/dolarblue')
      .then((response) => {
        const result = `DOLAR BLUE:\n\nCompra: ${response.data.compra}\nVenta: ${response.data.venta}`
        ctx.reply(result)
      });
  }
}