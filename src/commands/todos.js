const { getCollectionByName } = require('../db');
const { getMessageParameters } = require('../util/messageParameters');

module.exports = {
  name: 'todos',
  handle: async (ctx) => {
    const todosRecord = await getCollectionByName('todos').find({ chatId: ctx.message.chat.id });
    const usernameRequest = ctx.update.message.from.username;
    if (!usernameRequest) {
      ctx.reply('No podés usar este comando si no tenés un usuario creado. Create uno por favor.');
      return;
    }

    const parameters = getMessageParameters(ctx);

    if (!parameters.hasFirstParameter) {
      const todosUsernamesCandidates = todosRecord.usernames.filter((username) => username !== usernameRequest);
      if (todosUsernamesCandidates.length === todosRecord.usernames.length) {
        ctx.reply(`Para poder utilizar este comando necesitas inscribirte enviando "/todos in"`);
        return;
      }
      ctx.reply(todosUsernamesCandidates.reduce((acc, username) => `${acc}\n@${username}`));
    } else {
      switch (parameters.first) {
        case 'in':
          await todosCollection.updateOne( {
            _id: todosRecord._id,
            $push: { usernames: parameters.second }
          });
          ctx.reply('Agregado 👍');
          break;

        case 'out':
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