import { IRouterAdapter } from '../core/interfaces/router.adapter.interface';
import { CreateUserRouter } from './api/routes/create.user.router';
import { CreateUser } from './domain/usecases/create.user';
import { MemoryUserDataSource } from './external/datasources/memory.user.datasource';
import { UserRepository } from './infra/repositories/user.repository';
import { UserController } from './presenter/controllers/user.controller';

export interface IUserModuleArgs {
  router: IRouterAdapter;
}

export class UserModule {
  router: IRouterAdapter;

  constructor(args: IUserModuleArgs) {
    this.router = args.router;
  }

  setupRoutes(): void {
    const userDataSource = new MemoryUserDataSource();
    const userRepository = new UserRepository({ userDataSource });
    const createUserUseCase = new CreateUser({ userRepository });
    const userController = new UserController({ createUserUseCase });
    const createUserRouter = new CreateUserRouter({ userController });
    this.router.post('/users', createUserRouter);
  }
}
