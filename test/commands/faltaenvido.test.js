const faltaEnvido  = require('../../src/commands/faltaenvido');
jest.mock('../../src/db/index');
const { getCollectionByName } = require('../../src/db/index');

describe('falta envido command', () => {

  const ctx = {
    update: {
      message: {
        from: {
          username: 'jns'
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

  let findMock, updateOneMock;

  beforeEach(() => {
    findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      cantadoBy: undefined,
      phrases: ['%s cantó la falta']
    }).mockResolvedValueOnce({
      _id: 1,
      cantadoBy: 'jns',
      phrases: ['%s cantó la falta']
    });
    updateOneMock = jest.fn();

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
        updateOne: updateOneMock
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('shot falta envido', async () => {

    await faltaEnvido.handle(ctx);

    expect(findMock).toHaveBeenCalled();
    expect(findMock.mock.calls[0][0]).toStrictEqual({ chatId: 1 });
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[0][0].includes('FALTA ENVIDOOOO CHEEEE')).toBe(true);
    expect(updateOneMock).toHaveBeenCalledWith({ _id: 1, $set: { cantadoBy: 'jns' } });
  });
  test('shot falta envido and reject shot twice', async () => {

    await faltaEnvido.handle(ctx);

    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[0][0].includes('FALTA ENVIDOOOO CHEEEE')).toBe(true);
    expect(updateOneMock).toHaveBeenCalledWith({ _id: 1, $set: { cantadoBy: 'jns' } });

    await faltaEnvido.handle(ctx);
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[1][0].includes('La falta ya está cantada por jns.')).toBe(true);
    expect(updateOneMock).toHaveBeenCalledTimes(1);
  });

  test('use firstname', async () => {
    ctx.update.message.from = {
      username: undefined,
      first_name: 'jns_first_name'
    };

    await faltaEnvido.handle(ctx);

    expect(ctx.reply).toHaveBeenCalled();
    expect(updateOneMock).toHaveBeenCalledWith({ _id: 1, $set: { cantadoBy: 'jns_first_name' } });
  });
});