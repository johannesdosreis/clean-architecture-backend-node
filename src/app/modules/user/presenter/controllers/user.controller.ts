import { matchW } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { DeleteUserUseCase } from '~/src/app/modules/user/domain/usecases/delete.user.usecase';
import { ReadAllUserUseCase } from '~/src/app/modules/user/domain/usecases/readAll.user.usecase';
import { ReadByFilterUserUseCase } from '~/src/app/modules/user/domain/usecases/readByFilter.user.usecase';
import { ReadByIdUserUseCase } from '~/src/app/modules/user/domain/usecases/readById.user.usecase';
import { UpdateUserUseCase } from '~/src/app/modules/user/domain/usecases/update.user.usecase';
import { Failure } from '../../domain/errors/failure';
import { IUser } from '../../domain/interfaces/user.entity.interface';
import { CreateUserUseCase } from '../../domain/usecases/create.user.usecase';

export class UserController {
  createUserUseCase: CreateUserUseCase;
  updateUserUseCase: UpdateUserUseCase;
  readAllUserUseCase: ReadAllUserUseCase;
  readByIdUserUseCase: ReadByIdUserUseCase;
  readByFilterUserUseCase: ReadByFilterUserUseCase;
  deleteUserUseCase: DeleteUserUseCase;

  constructor(
    createUserUseCase: CreateUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    readAllUserUseCase: ReadAllUserUseCase,
    readByIdUserUseCase: ReadByIdUserUseCase,
    readByFilterUserUseCase: ReadByFilterUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
  ) {
    this.createUserUseCase = createUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.readAllUserUseCase = readAllUserUseCase;
    this.readByIdUserUseCase = readByIdUserUseCase;
    this.readByFilterUserUseCase = readByFilterUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async createUserController(
    name: string,
    email: string,
  ): Promise<Failure | IUser> {
    const user = await this.createUserUseCase.call(name, email);

    return pipe(
      user,
      matchW(
        l => l,
        r => r,
      ),
    );
  }

  async udpateUserController(user: IUser): Promise<Failure | IUser> {
    const userUpdated = await this.updateUserUseCase.call(user);

    return pipe(
      userUpdated,
      matchW(
        l => l,
        r => r,
      ),
    );
  }

  async readAllUserController(): Promise<Failure | IUser[]> {
    const users = await this.readAllUserUseCase.call();

    return pipe(
      users,
      matchW(
        l => l,
        r => r,
      ),
    );
  }

  async readByIdUserController(id: string): Promise<Failure | IUser> {
    const user = await this.readByIdUserUseCase.call(id);

    return pipe(
      user,
      matchW(
        l => l,
        r => r,
      ),
    );
  }

  async readByFilterUserController(filter: string): Promise<Failure | IUser[]> {
    const users = await this.readByFilterUserUseCase.call(filter);

    return pipe(
      users,
      matchW(
        l => l,
        r => r,
      ),
    );
  }

  async deleteUserController(id: string): Promise<Failure | null> {
    const user = await this.deleteUserUseCase.call(id);

    return pipe(
      user,
      matchW(
        l => l,
        () => null,
      ),
    );
  }
}
