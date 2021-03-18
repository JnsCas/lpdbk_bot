const todos = require('../../src/commands/todos');
jest.mock('../../src/db/index');
const { getCollectionByName } = require('../../src/db/index');

describe('todos command', () => {

  const ctx = {
    update: {
      message: {
        text: '/todos',
        from: {
          username: undefined
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

  test('username required', async () => {

    await todos.handle(ctx);

    expect(ctx.reply).toHaveBeenCalledWith('No podés usar este comando si no tenés un usuario creado. Create uno por favor.');
  });

  test('subscription required', async () => {
    ctx.update.message.from.username = 'jns';

    const findMock = jest.fn().mockResolvedValueOnce({
      chatId: 1,
      usernames: ['otro']
    });

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
      }
    });

    await todos.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(ctx.reply).toHaveBeenCalledWith('Para poder utilizar este comando necesitas inscribirte enviando "/todos in"');
  });

  test('there are no subscribers', async () => {
    ctx.update.message.from.username = 'jns';

    const findMock = jest.fn().mockResolvedValueOnce({
      chatId: 1,
      usernames: ['jns']
    });

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
      }
    });

    await todos.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(ctx.reply).toHaveBeenCalledWith(`No hay nadie inscripto para arrobar 🤷‍`);
  });

  test('in', async () => {
    ctx.update.message.text = '/todos in';
    ctx.update.message.from.username = 'jns';

    const findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      chatId: 1,
      usernames: ['otro']
    });

    const updateOneMock = jest.fn();

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
        updateOne: updateOneMock
      }
    });

    await todos.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(updateOneMock).toHaveBeenCalledWith({
      _id: 1,
      $push: { usernames: 'jns' }
    });
    expect(ctx.reply).toHaveBeenCalledWith('Agregado 👍');
  });

  test('in twice', async () => {
    ctx.update.message.text = '/todos in';
    ctx.update.message.from.username = 'jns';

    const findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      chatId: 1,
      usernames: ['jns']
    });

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock
      }
    });

    await todos.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(ctx.reply).toHaveBeenCalledWith('No podés inscribirte dos veces!');
  });

  test('out', async () => {
    ctx.update.message.text = '/todos out';
    ctx.update.message.from.username = 'jns';

    const findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      chatId: 1,
      usernames: ['jns']
    });

    const updateOneMock = jest.fn();

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock,
        updateOne: updateOneMock
      }
    });

    await todos.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(updateOneMock).toHaveBeenCalledWith({
      _id: 1,
      $set: { names: [] }
    });
    expect(ctx.reply).toHaveBeenCalledWith('Eliminado 👍');
  });

  test('out twice', async () => {
    ctx.update.message.text = '/todos out';
    ctx.update.message.from.username = 'jns';

    const findMock = jest.fn().mockResolvedValueOnce({
      _id: 1,
      chatId: 1,
      usernames: []
    });

    getCollectionByName.mockImplementation((_) => {
      return {
        find: findMock
      }
    });

    await todos.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(ctx.reply).toHaveBeenCalledWith('No estabas inscripto 🤷‍')
  });

});