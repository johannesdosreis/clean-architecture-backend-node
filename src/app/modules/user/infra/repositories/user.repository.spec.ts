import { mock } from 'jest-mock-extended';
import { matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { IUserDataSource } from '../interfaces/user.datasource.interface';
import { ICreateUserCallArgs } from '../../domain/usecases/create.user';
import { UserModel } from '../models/user.model';
import { UserRepository } from './user.repository';
import { FailureMessages } from '../../domain/errors/failure.messages';
import { ConnectionError } from '../../domain/errors/failure';

describe('CreateUserUseCase', () => {
  const userDataSourceMock = mock<IUserDataSource>();
  userDataSourceMock.createUser.mockImplementation(
    async (args: ICreateUserCallArgs) => {
      const user = new UserModel({
        id: '0',
        name: args.name,
        email: args.email,
      });
      return Promise.resolve(user);
    },
  );

  const repository = new UserRepository({ userDataSource: userDataSourceMock });

  it('should call repository one time with correct parameters', async () => {
    const userOrFailure = await repository.createUser({
      name: 'john',
      email: 'john@example.com',
    });

    expect(userDataSourceMock.createUser).toHaveBeenCalledTimes(1);
    expect(userDataSourceMock.createUser).toHaveBeenCalledWith({
      name: 'john',
      email: 'john@example.com',
    });
  });

  it('should return a user', async () => {
    const userOrFailure = await repository.createUser({
      name: 'john',
      email: 'john@example.com',
    });

    expect(
      pipe(
        userOrFailure,
        matchW(
          (l) => l,
          (r) => r,
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
      async (args: ICreateUserCallArgs) => {
        throw new Error('');
      },
    );

    const userOrFailure = await repository.createUser({
      name: 'error',
      email: 'john@example.com',
    });

    expect(
      pipe(
        userOrFailure,
        matchW(
          (l) => l,
          (r) => r,
        ),
      ),
    ).toEqual(new ConnectionError(FailureMessages.ConnectionErrorMessage));
  });
});
