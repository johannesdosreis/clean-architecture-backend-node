import { mock } from 'jest-mock-extended';
import { matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { CreateUser, ICreateUserCallArgs } from './create.user';

describe('CreateUserUseCase', () => {
  const userRepositoryMock = mock<IUserRepository>();
  userRepositoryMock.createUser.mockImplementation(
    async (args: ICreateUserCallArgs) => {
      const user = new User({ id: '0', name: args.name, email: args.email });
      return Promise.resolve(right(user));
    },
  );

  const usecase = new CreateUser({ userRepository: userRepositoryMock });

  it('should call repository one time with correct parameters', async () => {
    const userOrFailure = await usecase.call({
      name: 'john',
      email: 'john@example.com',
    });

    expect(userRepositoryMock.createUser).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.createUser).toHaveBeenCalledWith({
      name: 'john',
      email: 'john@example.com',
    });
  });

  it('should return a user', async () => {
    const userOrFailure = await usecase.call({
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
});
