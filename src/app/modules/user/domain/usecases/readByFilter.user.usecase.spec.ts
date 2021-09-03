import { mock } from 'jest-mock-extended';
import { left, matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { ReadByFilterUserUseCase } from './readByFilter.user.usecase';
import { UserNotFoundError } from '../errors/failure';
import { FailureMessages } from '../errors/failure.messages';

describe('ReadByFilterUserUseCase', () => {
  const userRepositoryMock = mock<IUserRepository>();
  userRepositoryMock.readByFilterUserRepository.mockImplementation(
    async (filter: string) => {
      if (filter !== 'john')
        return Promise.resolve(
          left(new UserNotFoundError(FailureMessages.UserNotFoundMessage)),
        );
      const user = [
        new User('0', 'john', 'john@example.com'),
        new User('0', 'john', 'john2@example.com'),
      ];
      return Promise.resolve(right(user));
    },
  );

  const usecase = new ReadByFilterUserUseCase(userRepositoryMock);

  it('should call repository one time', async () => {
    await usecase.call('john');

    expect(userRepositoryMock.readByFilterUserRepository).toHaveBeenCalledTimes(
      1,
    );
  });

  it('should return all users that match filter', async () => {
    const userOrFailure = await usecase.call('john');

    expect(
      pipe(
        userOrFailure,
        matchW(
          l => l,
          r => r,
        ),
      ),
    ).toEqual([
      { email: 'john@example.com', id: '0', name: 'john' },
      { email: 'john2@example.com', id: '0', name: 'john' },
    ]);
  });

  it('should return a failure users not found', async () => {
    const userOrFailure = await usecase.call('johna');

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
