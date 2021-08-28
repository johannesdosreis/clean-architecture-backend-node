import { Either, left, right } from 'fp-ts/lib/Either';
import { ConnectionError, Failure } from '../../domain/errors/failure';
import { FailureMessages } from '../../domain/errors/failure.messages';
import { IUser } from '../../domain/interfaces/user.entity.interface';
import { IUserRepository } from '../../domain/interfaces/user.repository.interface';
import { ICreateUserCallArgs } from '../../domain/usecases/create.user';
import { IUserDataSource } from '../interfaces/user.datasource.interface';

export interface IUserRepositoryArgs {
  userDataSource: IUserDataSource;
}

export interface IUserRepositoryCallArgs {
  name: string;
  email: string;
}

export class UserRepository implements IUserRepository {
  userDataSource: IUserDataSource;

  constructor(args: IUserRepositoryArgs) {
    this.userDataSource = args.userDataSource;
  }

  async createUser(args: ICreateUserCallArgs): Promise<Either<Failure, IUser>> {
    try {
      const user = await this.userDataSource.createUser(args);
      return right(user);
    } catch (error) {
      return left(new ConnectionError(FailureMessages.ConnectionErrorMessage));
    }
  }
}
