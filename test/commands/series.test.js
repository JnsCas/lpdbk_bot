const seriesCommand = require('../../src/commands/series');

describe('series command', () => {
  beforeEach(() => {
    jest.mock('../../resources/lists/series.json', () => [
      "Serie1",
      "Serie2",
      "Serie3",
      "Serie4"
    ], { virtual: true });
  });

  afterEach(() => {
    jest.resetModules()
  });

  test('delete the last one', () => {
    const ctx = {
      update: {
        message: {
          text: '/series delete 4'
        }
      },
      reply: jest.fn()
    };
    seriesCommand.handle(ctx);
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[0][0]).toBe('1) Serie1\n2) Serie2\n3) Serie3');
  });
  describe('delete in the middle', () => {
    test('delete the second', () => {
      const ctx = {
        update: {
          message: {
            text: '/series delete 2'
          }
        },
        reply: jest.fn()
      };
      seriesCommand.handle(ctx);
      expect(ctx.reply).toHaveBeenCalled();
      expect(ctx.reply.mock.calls[0][0]).toBe('1) Serie1\n2) Serie3\n3) Serie4');
    });
    test('delete the third', () => {
      const ctx = {
        update: {
          message: {
            text: '/series delete 3'
          }
        },
        reply: jest.fn()
      };
      seriesCommand.handle(ctx);
      expect(ctx.reply).toHaveBeenCalled();
      expect(ctx.reply.mock.calls[0][0]).toBe('1) Serie1\n2) Serie2\n3) Serie4');
    });
  });

  test('delete the first one', () => {
    const ctx = {
      update: {
        message: {
          text: '/series delete 1'
        }
      },
      reply: jest.fn()
    };
    seriesCommand.handle(ctx);
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[0][0]).toBe('1) Serie2\n2) Serie3\n3) Serie4');
  });
});