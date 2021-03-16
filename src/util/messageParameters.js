const getMessageParameters = (ctx) => {
  const messageTextSplited = ctx.update.message.text.split(' ');
  const parameters = messageTextSplited.slice(1, messageTextSplited.length);
  const hasFirstParameter = parameters.length > 0;
  const hasSecondParameter = parameters.length > 1;
  return {
    first: hasFirstParameter ? parameters[0] : undefined,
    second: hasSecondParameter ? parameters.slice(1 , parameters.length).join(' ') : undefined,
    hasFirstParameter,
    hasSecondParameter
  }
};

module.exports = { getMessageParameters };