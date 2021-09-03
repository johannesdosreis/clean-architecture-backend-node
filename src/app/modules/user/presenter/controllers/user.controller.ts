import { matchW } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { Failure } from '../../domain/errors/failure';
import { IUser } from '../../domain/interfaces/user.entity.interface';
import { CreateUser } from '../../domain/usecases/create.user';

export class UserController {
  createUserUseCase: CreateUser;

  constructor(createUserUseCase: CreateUser) {
    this.createUserUseCase = createUserUseCase;
  }

  async createUser(name: string, email: string): Promise<Failure | IUser> {
    const user = await this.createUserUseCase.call(name, email);

    return pipe(
      user,
      matchW(
        l => l,
        r => r,
      ),
    );
  }
}
