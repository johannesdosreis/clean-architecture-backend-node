import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { IUser } from '../interfaces/user.entity.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';

export interface ICreateUserArgs {
  userRepository: IUserRepository;
}

export interface ICreateUserCallArgs {
  name: string;
  email: string;
}

export class CreateUser {
  userRepository: IUserRepository;

  constructor(args: ICreateUserArgs) {
    this.userRepository = args.userRepository;
  }

  async call(args: ICreateUserCallArgs): Promise<Either<Failure, IUser>> {
    return await this.userRepository.createUser(args);
  }
}
