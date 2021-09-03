import { UserModel } from '../../infra/models/user.model';
import { MemoryUserDataSource } from './memory.user.datasource';

describe('MemoryUserDataSource', () => {
  const memoryUserDataSource = new MemoryUserDataSource();
  it('should return a UserModel', async () => {
    const user = await memoryUserDataSource.createUser(
      'john',
      'john@example.com',
    );

    expect(user).toEqual(new UserModel('0', 'john', 'john@example.com'));
  });
});
