const { todosCollection } = require('../db');
const { getMessageParameters } = require('../util/messageParameters');

module.exports = {
  name: 'todos',
  handle: async (ctx) => {
    const todosRecord = await todosCollection.find({ chatId: process.env.CHAT_ID }); //FIXME env
    const parameters = getMessageParameters(ctx);

    if (!parameters.hasSecondParameter) {
      ctx.reply(todosRecord.usernames.reduce((acc, elem) => `${acc}\n${elem}`));
    } else {
      if (parameters.second.charAt(0) !== '@') {
        ctx.reply(`'${parameters.second}' no es un username valido.`);
        return;
      }
      switch (parameters.first) {
        case 'add':
        case 'agregar':
          await todosCollection.updateOne( {
            _id: todosRecord._id,
            $push: { usernames: parameters.second }
          });
          ctx.reply('Agregado 👍');
          break;

        case 'delete':
        case 'eliminar':
          const usernamesToUpdate = todosRecord.usernames.filter((username) => username !== parameters.second);
          await todosCollection.updateOne( {
            _id: todosRecord._id,
            $set: { names: usernamesToUpdate }
          });
          ctx.reply('Eliminado 👍');
          break;
      }
    }
  }
}