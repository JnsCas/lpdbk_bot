const flickrClient = require('../clients/flickr.client');

module.exports = {
  name: 'diego',
  handle: async (ctx) => {
    try {
      const urlPhoto = await flickrClient.getPhotoRandomByTag('diego');
      await ctx.replyWithPhoto(urlPhoto);
    } catch (e) {
      console.log(`Error with command ${this.name}: `, e);
      ctx.reply('No se por qué, pero no puedo mandarte fotos del Diego en este momento. Perdoname.');
    }
  }
}