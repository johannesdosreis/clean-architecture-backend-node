import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { ICreateUserCallArgs } from '../usecases/create.user';
import { IUser } from './user.entity.interface';

export interface IUserRepository {
  createUser(args: ICreateUserCallArgs): Promise<Either<Failure, IUser>>;
  // readAllUsers(): Promise<Either<Failure, IUser[]>>;
  // readUserById(id: string): Promise<Either<Failure, IUser>>;
  // readUsersByFilter(filter: string): Promise<Either<Failure, IUser[]>>;
  // updateUser(user: IUser): Promise<Either<Failure, IUser>>;
  // deleteUser(id: string): Promise<Either<Failure, void>>;
}
