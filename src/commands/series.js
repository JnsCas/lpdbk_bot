const fs = require('fs');

function writeResult(arrayToWrite) {
  const data = JSON.stringify(arrayToWrite);
  fs.writeFile(__dirname + '/../resources/lists/series.json', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('Series data saved.');
  });
}

module.exports = {
  name: 'series',
  handle: (ctx) => {
    const seriesArray = require('../../resources/lists/series.json');
    const messageTextSplited = ctx.update.message.text.split(' ');
    const parameters = messageTextSplited.slice(1, messageTextSplited.length);
    if (parameters.length > 1) {
      const firstParameter = parameters[0];
      const secondParameter = parameters.slice(1 , parameters.length).join(' ');
      switch (firstParameter) {
        case 'add':
        case 'agregar':
          writeResult(seriesArray.push(secondParameter));
          break;

        case 'delete':
        case 'eliminar':
          const indexToDelete = Number(secondParameter) - 1;
          if (indexToDelete > seriesArray.length || indexToDelete < 1) {
            return;
          }
          writeResult(seriesArray.splice(indexToDelete, 1));
          break;
      }
    }

    const result = seriesArray.map((serie, index) => `${index + 1}) ${serie}`).join('\n');
    ctx.reply(result);
  }
}