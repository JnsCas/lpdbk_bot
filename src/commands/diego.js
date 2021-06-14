const { getCollectionByName } = require('../db');
const { randomNumberRange } = require('../util/randomNumber');
const flickrClient = require('../clients/flickr.client');
const { getRandomFileId, getPhotosElement } = require('./util');

module.exports = {
  name: 'diego',
  handle: async (ctx) => {
    try {
      await ctx.telegram.sendChatAction(ctx.message.chat.id, "upload_photo");

      const randomNumber = randomNumberRange(1, 10);
      const { photosObject, photosIndex } = await getPhotosElement(ctx.message.chat.id, 'diego');
      if (randomNumber < 7 && photosObject?.fileIds.length > 0) {
        const fileIdSelected = getRandomFileId(photosObject);
        const photoCollection = await getCollectionByName('photos');
        await photoCollection.updateOne(
          { chatId: ctx.message.chat.id },
          { $set: { [`photos.${photosIndex}.lastFileIdSent`]: fileIdSelected } },
        );
        await ctx.replyWithPhoto(
          fileIdSelected,
          { reply_to_message_id: ctx.message.message_id });
      } else {
        const urlPhoto = await flickrClient.getPhotoRandomByTag('diego');
        await ctx.replyWithPhoto(urlPhoto, { reply_to_message_id: ctx.message.message_id });
      }
    } catch (e) {
      console.log(`Error with command ${this.name}: `, e);
      ctx.reply(
        'No se por qué, pero no puedo mandarte fotos del Diego en este momento. Perdoname.',
        { reply_to_message_id: ctx.message.message_id }
      );
    }
  }
};