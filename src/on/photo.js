const { getCollectionByName } = require('../db');

module.exports = {
  name: 'photo',
  handle: async (ctx) => {
    const [category] = ctx.message.caption.split(' ');
    if (!category) {
      ctx.reply(`Para subir una foto tenés que ingresar la categoría en la descripción`, { reply_to_message_id: ctx.message.message_id });
      return;
    }

    const photosCollection = await getCollectionByName('photos');
    const photoRecord = await photosCollection.findOne({ chatId: ctx.message.chat.id });
    const categoryIndex = photoRecord.categories.findIndex((c) => c.name === category.toLowerCase());
    if (categoryIndex < 0) {
      ctx.reply(`La categoría '${category}' no existe 🤷‍♂️`, { reply_to_message_id: ctx.message.message_id });
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
  }
}