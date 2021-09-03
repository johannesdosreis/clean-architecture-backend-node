import { mock } from 'jest-mock-extended';
import { matchW, right } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';

import { IUserRepository } from '../interfaces/user.repository.interface';
import { User } from '../entities/user.entity';
import { ReadAllUserUseCase } from './readAll.user.usecase';

describe('ReadAllUserUseCase', () => {
  const userRepositoryMock = mock<IUserRepository>();
  userRepositoryMock.readAllUserRepository.mockImplementation(async () => {
    const users = [
      new User('0', 'john', 'john@example.com'),
      new User('1', 'mary', 'mary@example.com'),
    ];
    return Promise.resolve(right(users));
  });

  const usecase = new ReadAllUserUseCase(userRepositoryMock);

  it('should call repository one time', async () => {
    await usecase.call();

    expect(userRepositoryMock.readAllUserRepository).toHaveBeenCalledTimes(1);
  });

  it('should return all users', async () => {
    const userOrFailure = await usecase.call();

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
      { email: 'mary@example.com', id: '1', name: 'mary' },
    ]);
  });
});
