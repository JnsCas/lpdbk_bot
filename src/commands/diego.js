const { getCollectionByName } = require('../db');
const { randomNumberRange } = require('../util/randomNumber');
const flickrClient = require('../clients/flickr.client');
const { getRandomFileId } = require('./util');

module.exports = {
  name: 'diego',
  handle: async (ctx) => {
    try {
      await ctx.telegram.sendChatAction(ctx.message.chat.id, "upload_photo");

      const photoCollection = await getCollectionByName('photos');
      const photoRecord = await photoCollection.findOne({ chatId: ctx.message.chat.id });
      const categoryIndex = photoRecord.categories.findIndex((category) => category.name === 'diego');

      const randomNumber = randomNumberRange(1, 10);
      const category = photoRecord.categories[categoryIndex];
      if (randomNumber < 7 && category.fileIds.length > 0) {
        const fileIdSelected = getRandomFileId(category);
        await photoCollection.updateOne(
          { chatId: ctx.message.chat.id },
          { $set: { [`categories.${categoryIndex}.lastFileIdSent`]: fileIdSelected } },
        );
        await ctx.replyWithPhoto(
          fileIdSelected,
          { reply_to_message_id: ctx.message.message_id });
      } else {
        const urlPhoto = await flickrClient.getPhotoRandomByTag('diego');
        await ctx.replyWithPhoto(urlPhoto, { reply_to_message_id: ctx.message.message_id });
      }
    } catch (e) {
      console.error(`Error with command ${this.name}: `, e);
      ctx.reply(
        'No se por qué, pero no puedo mandarte fotos del Diego en este momento. Perdoname.',
        { reply_to_message_id: ctx.message.message_id }
      );
    }
  }
};