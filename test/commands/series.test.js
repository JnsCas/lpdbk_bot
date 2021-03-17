const seriesCommand = require('../../src/commands/series');
jest.mock('../../src/db/index');
const { getCollectionByName } = require('../../src/db/index');

describe('series command', () => {

  const ctx = {
    update: {
      message: {
        text: undefined
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
      names: [
        "Serie1",
        "Serie2",
        "Serie3",
        "Serie4"
      ]
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
    jest.resetModules()
  });

  test('delete the last one', async () => {
    ctx.update.message.text = '/series delete 4';

    await seriesCommand.handle(ctx);

    expect(updateOneMock).toHaveBeenCalledWith({
      _id: 1,
      $set: { names: ['Serie1', 'Serie2', 'Serie3'] }
    });
    expect(ctx.reply).toHaveBeenCalledWith('1) Serie1\n2) Serie2\n3) Serie3');
  });

  describe('delete in the middle', () => {
    test('delete the second', async () => {
      ctx.update.message.text = '/series delete 2';

      await seriesCommand.handle(ctx);

      expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
      expect(updateOneMock).toHaveBeenCalledWith({
        _id: 1,
        $set: { names: ['Serie1', 'Serie3', 'Serie4'] }
      });
      expect(ctx.reply).toHaveBeenCalledWith('1) Serie1\n2) Serie3\n3) Serie4');
    });
    test('delete the third', async () => {
      ctx.update.message.text = '/series delete 3';

      await seriesCommand.handle(ctx);

      expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
      expect(updateOneMock).toHaveBeenCalledWith({
        _id: 1,
        $set: { names: ['Serie1', 'Serie2', 'Serie4'] }
      });
      expect(ctx.reply).toHaveBeenCalledWith('1) Serie1\n2) Serie2\n3) Serie4');
    });
  });

  test('delete the first one', async () => {
    ctx.update.message.text = '/series delete 1';

    await seriesCommand.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(updateOneMock).toHaveBeenCalledWith({
      _id: 1,
      $set: { names: ['Serie2', 'Serie3', 'Serie4'] }
    });
    expect(ctx.reply).toHaveBeenCalledWith('1) Serie2\n2) Serie3\n3) Serie4');
  });

  test('add new serie', async () => {
    ctx.update.message.text = '/series add adding something new';

    updateOneMock.mockReturnValueOnce({
      _id: 1,
      names: [
        "Serie1",
        "Serie2",
        "Serie3",
        "Serie4",
        "adding something new"
      ]
    });

    await seriesCommand.handle(ctx);

    expect(findMock).toHaveBeenCalledWith({ chatId: 1 });
    expect(updateOneMock).toHaveBeenCalledWith({
      _id: 1,
      $push: { names: 'adding something new' }
    });
    expect(ctx.reply).toHaveBeenCalledWith('1) Serie1\n2) Serie2\n3) Serie3\n4) Serie4\n5) adding something new');
  });
});