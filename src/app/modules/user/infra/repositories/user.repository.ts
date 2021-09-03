import { Either, left, right } from 'fp-ts/lib/Either';
import { ConnectionError, Failure } from '../../domain/errors/failure';
import { FailureMessages } from '../../domain/errors/failure.messages';
import { IUser } from '../../domain/interfaces/user.entity.interface';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { IUserDataSource } from '../interfaces/user.datasource.interface';

export class UserRepository implements IUserRepository {
  userDataSource: IUserDataSource;

  constructor(userDataSource: IUserDataSource) {
    this.userDataSource = userDataSource;
  }

  async createUserRepository(
    name: string,
    email: string,
  ): Promise<Either<Failure, IUser>> {
    try {
      const user = await this.userDataSource.createUserDataSource(name, email);
      return right(user);
    } catch (error) {
      return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    }
  }

  async readAllUserRepository(): Promise<Either<Failure, IUser[]>> {
    // try {
    const users = await this.userDataSource.readAllUserDataSource();
    // if (users.length === 0)
    //   return left(new UserNotFoundError(FailureMessages.UserNotFoundMessage));

    return right(users);
    // } catch (error) {
    //   return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    // }
  }

  async readByIdUserRepository(id: string): Promise<Either<Failure, IUser>> {
    // try {
    const user = await this.userDataSource.readByIdUserDataSource(id);
    return right(user);
    // } catch (error) {
    //   // todo check if user not found
    //   // if (error.message === 'User not found')
    //   //   return left(new UserNotFoundError(FailureMessages.UserNotFoundMessage));
    //   return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    // }
  }

  async readByFilterUserRepository(
    filter: string,
  ): Promise<Either<Failure, IUser[]>> {
    // try {
    const user = await this.userDataSource.readByFilterUserDataSource(filter);
    return right(user);
    // } catch (error) {
    //   // todo check if user not found
    //   // if (error.message === 'User not found')
    //   //   return left(new UserNotFoundError(FailureMessages.UserNotFoundMessage));
    //   return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    // }
  }

  async updateUserRepository(user: IUser): Promise<Either<Failure, IUser>> {
    // try {
    const userUpdated = await this.userDataSource.updateUserDataSource(user);
    return right(userUpdated);
    // } catch (error) {
    //   // todo check if user not found
    //   // if (error.message === 'User not found')
    //   //   return left(new UserNotFoundError(FailureMessages.UserNotFoundMessage));
    //   return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    // }
  }

  async deleteUserRepository(id: string): Promise<Either<Failure, null>> {
    // try {
    await this.userDataSource.deleteUserDataSource(id);
    return right(null);
    // } catch (error) {
    //   // todo check if user not found
    //   // if (error.message === 'User not found')
    //   //   return left(new UserNotFoundError(FailureMessages.UserNotFoundMessage));
    //   return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    // }
  }
}
