const { getCollectionByName } = require('../db');
const { getMessageParameters } = require('../util/messageParameters');

module.exports = {
  name: 'todos',
  handle: async (ctx) => {
    const usernameRequest = ctx.update.message.from.username;
    if (!usernameRequest) {
      ctx.reply('No podés usar este comando si no tenés un usuario creado. Create uno por favor.');
      return;
    }

    const todosCollection = await getCollectionByName('todos');
    const todosRecord = await todosCollection.findOne({ chatId: ctx.message.chat.id });

    const parameters = getMessageParameters(ctx);

    const alreadyExists = todosRecord.usernames.includes(usernameRequest);
    switch (parameters.first) {
      case 'in':
        if (alreadyExists) {
          ctx.reply(`No podés inscribirte dos veces @${usernameRequest}!`)
          return;
        }
        await todosCollection.updateOne(
          { _id: todosRecord._id },
          { $push: { usernames: usernameRequest } }
        );
        ctx.reply(`Agregado @${usernameRequest} 👍`);
        break;

      case 'out':
        if (!alreadyExists) {
          ctx.reply(`No estabas inscripto @${usernameRequest} 🤷‍`);
          return;
        }
        const usernamesToUpdate = todosRecord.usernames.filter((username) => username !== usernameRequest);
        await todosCollection.updateOne(
          { _id: todosRecord._id },
          { $set: { usernames: usernamesToUpdate } }
        );
        ctx.reply(`Eliminado @${usernameRequest} 👍`);
        break;

      default:
        const todosUsernamesCandidates = todosRecord.usernames.filter((username) => username !== usernameRequest);
        if (todosUsernamesCandidates.length === todosRecord.usernames.length) {
          ctx.reply(`Para poder utilizar este comando necesitas inscribirte enviando "/todos in"`);
        } else if (todosUsernamesCandidates.length === 0) {
          ctx.reply(`No hay nadie inscripto para arrobar 🤷‍`);
        } else {
          ctx.reply(`${usernameRequest}:\n${todosUsernamesCandidates.map((username) => `@${username}`).join('\n')}`);
        }
        break;
    }
  }
}