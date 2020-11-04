const faltaEnvido  = require('../../src/commands/faltaenvido');
const quiero  = require('../../src/commands/quiero');

describe('falta envido command', () => {

  afterEach(() => {
    faltaEnvido.status.isCantado = false;
    faltaEnvido.status.username = undefined;
  });

  test('falta envido accepted', () => {
    const ctxFrom = {
      update: {
        message: {
          from: {
            username: 'jns'
          }
        }
      },
      reply: jest.fn()
    };

    faltaEnvido.handle(ctxFrom);
    expect(ctxFrom.reply).toHaveBeenCalled();
    expect(ctxFrom.reply.mock.calls[0][0].includes('FALTA ENVIDOOOO CHEEEE')).toBe(true);
    expect(faltaEnvido.status.isCantado).toBe(true);
    expect(faltaEnvido.status.username).toBe('jns');

    const ctxTo = {
      update: {
        message: {
          from: {
            username: 'otro'
          }
        }
      },
      reply: jest.fn()
    };

    quiero.handle(ctxTo);

    expect(ctxTo.reply).toHaveBeenCalled();
    expect(ctxTo.reply.mock.calls[0][0].includes('Tantos')).toBe(true);
    expect(faltaEnvido.status.isCantado).toBe(false);
    expect(faltaEnvido.status.username).toBe(undefined);
  });
});