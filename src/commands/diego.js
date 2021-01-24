const flickrClient = require('../clients/flickr.client');

module.exports = {
  name: 'diego',
  handle: async (ctx) => {
    const urlPhoto = await flickrClient.getPhotoRandomByTag('diego');
    ctx.replyWithPhoto(urlPhoto);
  }
}