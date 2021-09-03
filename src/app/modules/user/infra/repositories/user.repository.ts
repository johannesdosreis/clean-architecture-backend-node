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

  async createUser(
    name: string,
    email: string,
  ): Promise<Either<Failure, IUser>> {
    try {
      const user = await this.userDataSource.createUser(name, email);
      return right(user);
    } catch (error) {
      return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    }
  }
}
