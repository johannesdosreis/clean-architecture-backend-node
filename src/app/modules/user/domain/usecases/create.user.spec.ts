import { mock } from 'jest-mock-extended';
import { matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { CreateUser } from './create.user';

describe('CreateUserUseCase', () => {
  const userRepositoryMock = mock<IUserRepository>();
  userRepositoryMock.createUser.mockImplementation(
    async (name: string, email: string) => {
      const user = new User('0', name, email);
      return Promise.resolve(right(user));
    },
  );

  const usecase = new CreateUser(userRepositoryMock);

  it('should call repository one time with correct parameters', async () => {
    await usecase.call('john', 'john@example.com');

    expect(userRepositoryMock.createUser).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.createUser).toHaveBeenCalledWith(
      'john',
      'john@example.com',
    );
  });

  it('should return a user', async () => {
    const userOrFailure = await usecase.call('john', 'john@example.com');

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
});
