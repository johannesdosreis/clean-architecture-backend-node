import { mock } from 'jest-mock-extended';
import { matchW } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { IUserDataSource } from '../interfaces/user.datasource.interface';
import { UserModel } from '../models/user.model';
import { UserRepository } from './user.repository';
import { FailureMessages } from '../../domain/errors/failure.messages';
import { ConnectionError } from '../../domain/errors/failure';

describe('CreateUserUseCase', () => {
  const userDataSourceMock = mock<IUserDataSource>();
  userDataSourceMock.createUser.mockImplementation(
    async (name: string, email: string) => {
      const user = new UserModel('0', name, email);
      return Promise.resolve(user);
    },
  );

  const repository = new UserRepository(userDataSourceMock);

  it('should call repository one time with correct parameters', async () => {
    await repository.createUser('john', 'john@example.com');

    expect(userDataSourceMock.createUser).toHaveBeenCalledTimes(1);
    expect(userDataSourceMock.createUser).toHaveBeenCalledWith(
      'john',
      'john@example.com',
    );
  });

  it('should return a user', async () => {
    const userOrFailure = await repository.createUser(
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

  it('should return connection error', async () => {
    userDataSourceMock.createUser.mockImplementation(
      async (name: string, email: string) => {
        throw new Error('');
      },
    );

    const userOrFailure = await repository.createUser(
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
