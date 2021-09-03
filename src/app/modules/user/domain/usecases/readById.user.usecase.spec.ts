import { mock } from 'jest-mock-extended';
import { left, matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { ReadByIdUserUseCase } from './readById.user.usecase';
import { UserNotFoundError } from '../errors/failure';
import { FailureMessages } from '../errors/failure.messages';

describe('ReadByIdUserUseCase', () => {
  const userRepositoryMock = mock<IUserRepository>();
  userRepositoryMock.readByIdUserRepository.mockImplementation(
    async (id: string) => {
      if (id !== '0')
        return Promise.resolve(
          left(new UserNotFoundError(FailureMessages.UserNotFoundMessage)),
        );
      const user = new User('0', 'john', 'john@example.com');
      return Promise.resolve(right(user));
    },
  );

  const usecase = new ReadByIdUserUseCase(userRepositoryMock);

  it('should call repository one time', async () => {
    await usecase.call('0');

    expect(userRepositoryMock.readByIdUserRepository).toHaveBeenCalledTimes(1);
  });

  it('should return a user', async () => {
    const userOrFailure = await usecase.call('0');

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

  it('should return a failure user not found', async () => {
    const userOrFailure = await usecase.call('1');

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual({
      message: FailureMessages.UserNotFoundMessage,
      name: 'user-not-found',
    });
  });
});
