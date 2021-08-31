import { matchW } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { Failure } from '../../domain/errors/failure';
import { IUser } from '../../domain/interfaces/user.entity.interface';
import {
  CreateUser,
  ICreateUserCallArgs,
} from '../../domain/usecases/create.user';

export interface IUserControllerArgs {
  createUserUseCase: CreateUser;
}

export class UserController {
  createUserUseCase: CreateUser;

  constructor(args: IUserControllerArgs) {
    this.createUserUseCase = args.createUserUseCase;
  }

  async createUser(newUser: ICreateUserCallArgs): Promise<Failure | IUser> {
    const user = await this.createUserUseCase.call(newUser);

    return pipe(
      user,
      matchW(
        (l) => l,
        (r) => r,
      ),
    );
  }
}
