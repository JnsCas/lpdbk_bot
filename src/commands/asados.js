const flickrClient = require('../clients/flickr.client');

module.exports = {
  name: 'asados',
  handle: async (ctx) => {
    const urlPhoto = await flickrClient.getPhotoRandomByTag('asados');
    ctx.replyWithPhoto(urlPhoto);
  }
}