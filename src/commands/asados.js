const { getCollectionByName } = require('../db');
const { getRandomFileId } = require('./util');

module.exports = {
  name: 'asados',
  handle: async (ctx) => {
    try {
      const photoCollection = await getCollectionByName('photos');
      const photoRecord = await photoCollection.findOne({ chatId: ctx.message.chat.id });
      const categoryIndex = photoRecord.categories.findIndex((category) => category.name === 'asados');

      const category = photoRecord.categories[categoryIndex];
      if (category.fileIds.length > 0) {
        await ctx.telegram.sendChatAction(ctx.message.chat.id, "upload_photo");
        const fileIdSelected = getRandomFileId(category);
        await photoCollection.updateOne(
          { chatId: ctx.message.chat.id },
          { $set: { [`categories.${categoryIndex}.lastFileIdSent`]: fileIdSelected } },
        );
        await ctx.replyWithPhoto(
          fileIdSelected,
          { reply_to_message_id: ctx.message.message_id });
      } else {
        ctx.reply('No hay fotos para enviar. Podes subirlas enviando una foto con la descripción /asados')
      }

    } catch (e) {
      console.error(`Error with command ${this.name}: `, e);
      ctx.reply('No se por qué, pero no puedo mandarte fotos de asados en este momento. Perdoname.');
    }
  }
}