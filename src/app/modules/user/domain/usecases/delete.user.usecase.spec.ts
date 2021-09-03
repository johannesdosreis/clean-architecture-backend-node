import { mock } from 'jest-mock-extended';
import { left, matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { DeleteUserUseCase } from './delete.user.usecase';
import { FailureMessages } from '../errors/failure.messages';
import { UserNotFoundError } from '../errors/failure';

describe('DeleteUserUseCase', () => {
  const userRepositoryMock = mock<IUserRepository>();
  userRepositoryMock.deleteUserRepository.mockImplementation(
    async (id: string) => {
      if (id !== '0')
        return Promise.resolve(
          left(new UserNotFoundError(FailureMessages.UserNotFoundMessage)),
        );

      return Promise.resolve(right(null));
    },
  );

  const usecase = new DeleteUserUseCase(userRepositoryMock);

  it('should call repository one time with correct parameters', async () => {
    await usecase.call('0');

    expect(userRepositoryMock.deleteUserRepository).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.deleteUserRepository).toHaveBeenCalledWith('0');
  });

  it('should return a deleted user', async () => {
    const userOrFailure = await usecase.call('0');

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
