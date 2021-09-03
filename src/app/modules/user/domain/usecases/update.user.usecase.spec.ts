import { mock } from 'jest-mock-extended';
import { left, matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { UpdateUserUseCase } from './update.user.usecase';
import { IUser } from '../interfaces/user.entity.interface';
import { FailureMessages } from '../errors/failure.messages';
import { UserNotFoundError } from '../errors/failure';

describe('UpdateUserUseCase', () => {
  const userRepositoryMock = mock<IUserRepository>();
  userRepositoryMock.updateUserRepository.mockImplementation(
    async (user: IUser) => {
      if (user.id !== '0')
        return Promise.resolve(
          left(new UserNotFoundError(FailureMessages.UserNotFoundMessage)),
        );
      const userUpdated = new User('0', user.name, user.email);
      return Promise.resolve(right(userUpdated));
    },
  );

  const usecase = new UpdateUserUseCase(userRepositoryMock);

  it('should call repository one time with correct parameters', async () => {
    await usecase.call(new User('0', 'john', 'john@example.com'));

    expect(userRepositoryMock.updateUserRepository).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.updateUserRepository).toHaveBeenCalledWith({
      email: 'john@example.com',
      id: '0',
      name: 'john',
    });
  });

  it('should return a updated user', async () => {
    const userOrFailure = await usecase.call(
      new User('0', 'john', 'john@example.com'),
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

  it('should return a failure user not found', async () => {
    const userOrFailure = await usecase.call(
      new User('1', 'john', 'john@example.com'),
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
      message: FailureMessages.UserNotFoundMessage,
      name: 'user-not-found',
    });
  });
});
