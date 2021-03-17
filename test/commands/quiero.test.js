const quiero  = require('../../src/commands/quiero');
jest.mock('../../src/db/index');
const { getCollectionByName } = require('../../src/db/index');

describe('falta envido command', () => {

  const ctxTo = {
    update: {
      message: {
        from: {
          username: 'otro'
        }
      }
    },
    message: {
      chat: {
        id: 1
      }
    },
    reply: jest.fn()
  };

  test('falta envido accepted', async () => {
    const findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      chatId: 2,
      cantadoBy: 'jns',
      phrases: ['%s cantó la falta']
    });
    const updateOneMock = jest.fn();

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
        updateOne: updateOneMock
      }
    });

    await quiero.handle(ctxTo);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(ctxTo.reply).toHaveBeenCalled();
    expect(ctxTo.reply.mock.calls[0][0].includes('Tantos')).toBe(true);
    expect(updateOneMock).toHaveBeenCalledWith({ _id: 1, $set: { cantadoBy: undefined } });
  });

  test('Nobody said falta envido', async () => {
    const findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      chatId: 2,
      cantadoBy: undefined,
      phrases: ['%s cantó la falta']
    });
    const updateOneMock = jest.fn();

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
        updateOne: updateOneMock
      }
    });


    await quiero.handle(ctxTo);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(ctxTo.reply).toHaveBeenCalledWith('Nadie cantó la falta che.');
  });

  test('Same user said falta envido and accepted', async () => {
    const findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      chatId: 2,
      cantadoBy: 'otro',
      phrases: ['%s cantó la falta']
    });
    const updateOneMock = jest.fn();

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
        updateOne: updateOneMock
      }
    });


    await quiero.handle(ctxTo);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(ctxTo.reply).toHaveBeenCalledWith('Vos fuiste el que echó la falta @otro!');
  });
});