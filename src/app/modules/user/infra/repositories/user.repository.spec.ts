import { mock } from 'jest-mock-extended';
import { matchW } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { IUserDataSource } from '../interfaces/user.datasource.interface';
import { UserModel } from '../models/user.model';
import { UserRepository } from './user.repository';
import { FailureMessages } from '../../domain/errors/failure.messages';
import { ConnectionError } from '../../domain/errors/failure';
import { IUser } from '../../domain/interfaces/user.entity.interface';

const users = [
  new UserModel('0', 'john', 'john@example.com'),
  new UserModel('1', 'mary', 'mary@example.com'),
];

describe('UserRepository', () => {
  const userDataSourceMock = mock<IUserDataSource>();

  userDataSourceMock.createUserDataSource.mockImplementation(
    async (name: string, email: string) => {
      return Promise.resolve(users[0]);
    },
  );

  userDataSourceMock.readAllUserDataSource.mockImplementation(async () => {
    return Promise.resolve(users);
  });
  userDataSourceMock.readByIdUserDataSource.mockImplementation(
    async (id: string) => {
      const user = users.filter(user => user.id === id);

      return Promise.resolve(user[0]);
    },
  );
  userDataSourceMock.readByFilterUserDataSource.mockImplementation(
    async (filter: string) => {
      const usersFiltered = users.filter(
        user => user.email.includes(filter) || user.name.includes(filter),
      );
      return Promise.resolve(usersFiltered);
    },
  );
  userDataSourceMock.updateUserDataSource.mockImplementation(
    async (user: IUser) => {
      const userUpdated = users.filter(usr => usr.id === user.id)[0];

      return Promise.resolve({
        id: userUpdated.id,
        email: user.email,
        name: user.name,
      });
    },
  );
  userDataSourceMock.deleteUserDataSource.mockImplementation(
    async (id: string) => {
      users.filter(user => user.id === id);

      return Promise.resolve(null);
    },
  );

  const repository = new UserRepository(userDataSourceMock);

  it('should return an user created', async () => {
    const userOrFailure = await repository.createUserRepository(
      'john',
      'john@example.com',
    );

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual({
      id: '0',
      name: 'john',
      email: 'john@example.com',
    });
  });

  it('should return all user', async () => {
    const userOrFailure = await repository.readAllUserRepository();

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual(users);
  });

  it('should return an user by id', async () => {
    const userOrFailure = await repository.readByIdUserRepository('0');

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual({ email: 'john@example.com', id: '0', name: 'john' });
  });

  it('should return all user that match filter', async () => {
    const userOrFailure = await repository.readByFilterUserRepository('john');

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual([{ email: 'john@example.com', id: '0', name: 'john' }]);
  });

  it('should return an user updated', async () => {
    const userOrFailure = await repository.updateUserRepository(
      new UserModel('0', 'johan', 'johan@example.com'),
    );

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual({ email: 'johan@example.com', id: '0', name: 'johan' });
  });

  it('should delete an user', async () => {
    const userOrFailure = await repository.deleteUserRepository('0');

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual(null);
  });

  it('should return connection error', async () => {
    userDataSourceMock.createUserDataSource.mockImplementation(
      async (name: string, email: string) => {
        throw new Error('');
      },
    );

    const userOrFailure = await repository.createUserRepository(
      'error',
      'john@example.com',
    );

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual(new ConnectionError(FailureMessages.ConnectionErrorMessage));
  });
});
