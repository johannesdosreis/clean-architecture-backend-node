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

  createUser(user: ICreateUserCallArgs) {
    this.createUserUseCase.call(user);
  }
}
