const { getMessageParameters } = require('../../src/util/messageParameters');

describe('messageParameters', () => {
  it('without parameters', () => {
    const ctx = {
      update: {
        message: {
          text: '@command'
        }
      }
    };
    const parameters = getMessageParameters(ctx);

    expect(parameters.hasFirstParameter).toBe(false);
    expect(parameters.hasSecondParameter).toBe(false);
    expect(parameters.first).toBe(undefined);
    expect(parameters.second).toBe(undefined);
  });

  it('one parameter', () => {
    const ctx = {
      update: {
        message: {
          text: '@command param1'
        }
      }
    };
    const parameters = getMessageParameters(ctx);

    expect(parameters.hasFirstParameter).toBe(true);
    expect(parameters.hasSecondParameter).toBe(false);
    expect(parameters.first).toBe('param1');
    expect(parameters.second).toBe(undefined);
  });

  it('two parameters', () => {
    const ctx = {
      update: {
        message: {
          text: '@command param1 param2'
        }
      }
    };
    const parameters = getMessageParameters(ctx);

    expect(parameters.hasFirstParameter).toBe(true);
    expect(parameters.hasSecondParameter).toBe(true);
    expect(parameters.first).toBe('param1');
    expect(parameters.second).toBe('param2');
  });

  it('two parameters and the second parameter has spaces', () => {
    const ctx = {
      update: {
        message: {
          text: '@command param1 param2 param2bis'
        }
      }
    };
    const parameters = getMessageParameters(ctx);

    expect(parameters.hasFirstParameter).toBe(true);
    expect(parameters.hasSecondParameter).toBe(true);
    expect(parameters.first).toBe('param1');
    expect(parameters.second).toBe('param2 param2bis');
  });
});