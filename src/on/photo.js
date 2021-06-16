const { getCollectionByName } = require('../db');

module.exports = {
  name: 'photo',
  handle: async (ctx) => {
    try {
      const caption = ctx.message.caption;
      if (!caption || caption.slice(0,1) !== '/') {
        ctx.reply(`Para subir una foto tenés que ingresar la categoría en la descripción. Por ejemplo '/diego'`);
        return;
      }
      const category = caption.slice(1, caption.length).toLowerCase();
      const photosCollection = await getCollectionByName('photos');
      const photoRecord = await photosCollection.findOne({ chatId: ctx.message.chat.id });
      const categoryIndex = photoRecord.categories.findIndex((c) => c.name === category);
      if (categoryIndex < 0) {
        ctx.reply(
          `La categoría '${category}' no existe 🤷‍♂️`,
          { reply_to_message_id: ctx.message.message_id }
        );
        return;
      }

      //get file id with biggest size (it is the last one in the array)
      const lastFileIdIndex = ctx.message.photo.length - 1;
      const fileIdToUpload = ctx.message.photo[lastFileIdIndex].file_id;

      await ctx.telegram.sendChatAction(ctx.message.chat.id, "upload_photo");
      const result = await photosCollection.updateOne(
        { _id: photoRecord._id } ,
        { $push: { [`categories.${categoryIndex}.fileIds`]: fileIdToUpload } }
      );
      if (result.modifiedCount) {
        ctx.reply(`Foto agregada a la categoria '${category}' 👍`, { reply_to_message_id: ctx.message.message_id });
      } else {
        ctx.reply('Algo salió mal 👎', { reply_to_message_id: ctx.message.message_id });
      }
    } catch (e) {
      console.log(`Error uploading photo: `, e);
      ctx.reply('Algo salió mal 👎');
    }
  }
}