const { getMessageParameters } = require('../util/messageParameters');

module.exports = {
  name: 'send',
  handle: async (ctx) => {
    const parameters = getMessageParameters(ctx);

    const usernameFrom = ctx.update.message.from.username || ctx.update.message.from.first_name;
    if (usernameFrom !== process.env.ADMIN_USERNAME) {
      console.log(`User '${usernameFrom}' is trying to use the send-message command`);
      return;
    }

    if (!parameters.hasSecondParameter) {
      ctx.reply('🤷‍♂️');
      return;
    }

    const chatIdDestination = parameters.first;
    const messageToSend = parameters.second;

    ctx.telegram.sendMessage(chatIdDestination, messageToSend);
    console.log(`The message '${messageToSend}' was sent to the chat id ${chatIdDestination}`);
  }
}