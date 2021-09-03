import { UserModel } from '../../infra/models/user.model';
import { MemoryUserDataSource } from './memory.user.datasource';

describe('MemoryUserDataSource', () => {
  const memoryUserDataSource = new MemoryUserDataSource();
  it('should return a UserModel', async () => {
    const user = await memoryUserDataSource.createUserDataSource(
      'john',
      'john@example.com',
    );

    expect(user).toEqual(new UserModel('0', 'john', 'john@example.com'));
  });

  it('should return all users', async () => {
    const users = await memoryUserDataSource.readAllUserDataSource();

    expect(users).toEqual([
      { email: 'john@example.com', id: '0', name: 'john' },
    ]);
  });

  it('should return an user by id', async () => {
    const users = await memoryUserDataSource.readByIdUserDataSource('0');

    expect(users).toEqual({ email: 'john@example.com', id: '0', name: 'john' });
  });

  it('should return all users that match filter', async () => {
    const users = await memoryUserDataSource.readByFilterUserDataSource('john');

    expect(users).toEqual([
      { email: 'john@example.com', id: '0', name: 'john' },
    ]);
  });

  it('should return an user updated ', async () => {
    const users = await memoryUserDataSource.updateUserDataSource({
      email: 'johan@example.com',
      id: '0',
      name: 'johan',
    });

    expect(users).toEqual({
      email: 'johan@example.com',
      id: '0',
      name: 'johan',
    });
  });

  it('should detete an user', async () => {
    await memoryUserDataSource.deleteUserDataSource('0');

    const users = await memoryUserDataSource.readAllUserDataSource();

    expect(users).toEqual([]);
  });
});
