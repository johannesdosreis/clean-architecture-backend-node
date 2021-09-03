import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { IUser } from './user.entity.interface';

export interface IUserRepository {
  createUserRepository(
    name: string,
    email: string,
  ): Promise<Either<Failure, IUser>>;
  readAllUserRepository(): Promise<Either<Failure, IUser[]>>;
  readByIdUserRepository(id: string): Promise<Either<Failure, IUser>>;
  readByFilterUserRepository(filter: string): Promise<Either<Failure, IUser[]>>;
  updateUserRepository(user: IUser): Promise<Either<Failure, IUser>>;
  deleteUserRepository(id: string): Promise<Either<Failure, null>>;
}
