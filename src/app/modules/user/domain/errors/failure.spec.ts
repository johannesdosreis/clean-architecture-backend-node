import { ConnectionError } from './failure';

describe('Failures', () => {
  it('should create Connection Error', () => {
    const error = new ConnectionError('Connection error');
    expect(error).toEqual({
      name: 'connection-error',
      message: 'Connection error',
    });
  });
});
