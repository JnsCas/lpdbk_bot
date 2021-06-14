const { getCollectionByName } = require('../db');
const { getRandomFileId, getPhotosElement } = require('./util');

module.exports = {
  name: 'asados',
  handle: async (ctx) => {
    try {
      await ctx.telegram.sendChatAction(ctx.message.chat.id, "upload_photo");

      const { photosObject, photosIndex } = await getPhotosElement(ctx.message.chat.id, 'asados');
      if (photosObject?.fileIds.length > 0) {
        const fileIdSelected = getRandomFileId(photosObject);
        const photoCollection = await getCollectionByName('photos');
        await photoCollection.updateOne(
          { chatId: ctx.message.chat.id },
          { $set: { [`photos.${photosIndex}.lastFileIdSent`]: fileIdSelected } },
        );
        await ctx.replyWithPhoto(
          fileIdSelected,
          { reply_to_message_id: ctx.message.message_id });
      }

    } catch (e) {
      console.log(`Error with command ${this.name}: `, e);
      ctx.reply('No se por qué, pero no puedo mandarte fotos de asados en este momento. Perdoname.');
    }
  }
}