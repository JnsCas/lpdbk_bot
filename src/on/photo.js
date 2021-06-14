const { getCollectionByName } = require('../db');

module.exports = {
  name: 'photo',
  handle: async (ctx) => {
    const [ , category] = ctx.message.caption.split(' ');
    if (!category) {
      return;
    }

    const photosCollection = await getCollectionByName('photos');
    const photoRecord = await photosCollection.findOne({ chatId: ctx.message.chat.id });

    const categoryIndex = photoRecord.photos.findIndex((photo) => photo.category === category);
    if (categoryIndex < 0) {
      return;
    }

    //get file id with biggest size (it is the last one in the array)
    const lastFileIdIndex = ctx.message.photo.length - 1;
    const fileIdToUpload = ctx.message.photo[lastFileIdIndex].file_id;

    await ctx.telegram.sendChatAction(ctx.message.chat.id, "upload_photo");
    const result = await photosCollection.updateOne(
      { _id: photoRecord._id } ,
      { $push: { [`photos.${categoryIndex}.fileIds`]: fileIdToUpload } }
    );
    if (result.modifiedCount) {
      ctx.reply('Foto agregada 👍', { reply_to_message_id: ctx.message.message_id });
    } else {
      ctx.reply('Algo salió mal 👎', { reply_to_message_id: ctx.message.message_id });
    }
  }
}