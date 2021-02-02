const flickrClient = require('../clients/flickr.client');

module.exports = {
  name: 'asados',
  handle: async (ctx) => {
    try {
      const urlPhoto = await flickrClient.getPhotoRandomByTag('asados');
      await ctx.replyWithPhoto(urlPhoto);
    } catch (e) {
      console.log(`Error with command ${this.name}: `, e);
      ctx.reply('No se por qué, pero no puedo mandarte fotos de asados en este momento. Perdoname.');
    }
  }
}