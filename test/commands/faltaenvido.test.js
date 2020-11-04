const faltaEnvido  = require('../../src/commands/faltaenvido');

describe('falta envido command', () => {

  afterEach(() => {
    faltaEnvido.status.isCantado = false;
    faltaEnvido.status.username = undefined;
  });

  test('shot falta envido', () => {
    const ctx = {
      update: {
        message: {
          from: {
            username: 'jns'
          }
        }
      },
      reply: jest.fn()
    }

    faltaEnvido.handle(ctx);
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[0][0].includes('FALTA ENVIDOOOO CHEEEE')).toBe(true);
    expect(faltaEnvido.status.isCantado).toBe(true);
    expect(faltaEnvido.status.username).toBe('jns');
  });
  test('shot falta envido and reject shot twice', () => {
    const ctx = {
      update: {
        message: {
          from: {
            username: 'jns'
          }
        }
      },
      reply: jest.fn()
    }

    faltaEnvido.handle(ctx);
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[0][0].includes('FALTA ENVIDOOOO CHEEEE')).toBe(true);
    expect(faltaEnvido.status.isCantado).toBe(true);
    expect(faltaEnvido.status.username).toBe('jns');

    faltaEnvido.handle(ctx);
    expect(ctx.reply).toHaveBeenCalled();
    expect(ctx.reply.mock.calls[1][0].includes('La falta ya está cantada por jns.')).toBe(true);
    expect(faltaEnvido.status.isCantado).toBe(true);
    expect(faltaEnvido.status.username).toBe('jns');
  });

  test('use firstname', () => {
    const ctx = {
      update: {
        message: {
          from: {
            username: undefined,
            first_name: 'jns_first_name'
          }
        }
      },
      reply: jest.fn()
    }

    faltaEnvido.handle(ctx);
    expect(ctx.reply).toHaveBeenCalled();
    expect(faltaEnvido.status.isCantado).toBe(true);
    expect(faltaEnvido.status.username).toBe('jns_first_name');
  });
});