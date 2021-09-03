import { DeleteUserRouter } from '~/src/app/modules/user/api/routes/delete.user.router';
import { ReadAllOrSearchUserRouter } from '~/src/app/modules/user/api/routes/readAllOrSearch.user.router';
import { ReadByIdUserRouter } from '~/src/app/modules/user/api/routes/readById.user.router';
import { UpdateUserRouter } from '~/src/app/modules/user/api/routes/udpate.user.router';
import { DeleteUserUseCase } from '~/src/app/modules/user/domain/usecases/delete.user.usecase';
import { ReadAllUserUseCase } from '~/src/app/modules/user/domain/usecases/readAll.user.usecase';
import { ReadByFilterUserUseCase } from '~/src/app/modules/user/domain/usecases/readByFilter.user.usecase';
import { ReadByIdUserUseCase } from '~/src/app/modules/user/domain/usecases/readById.user.usecase';
import { UpdateUserUseCase } from '~/src/app/modules/user/domain/usecases/update.user.usecase';
import { IRouterAdapter } from '../core/interfaces/router.adapter.interface';
import { CreateUserRouter } from './api/routes/create.user.router';
import { CreateUserUseCase } from './domain/usecases/create.user.usecase';
import { MemoryUserDataSource } from './external/datasources/memory.user.datasource';
import { UserRepository } from './infra/repositories/user.repository';
import { UserController } from './presenter/controllers/user.controller';

export class UserModule {
  router: IRouterAdapter;

  constructor(router: IRouterAdapter) {
    this.router = router;
  }

  setupRoutes(): void {
    const userDataSource = new MemoryUserDataSource();
    const userRepository = new UserRepository(userDataSource);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const readAllUserUseCase = new ReadAllUserUseCase(userRepository);
    const readByIdUserUseCase = new ReadByIdUserUseCase(userRepository);
    const readByFilterUserUseCase = new ReadByFilterUserUseCase(userRepository);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    const userController = new UserController(
      createUserUseCase,
      updateUserUseCase,
      readAllUserUseCase,
      readByIdUserUseCase,
      readByFilterUserUseCase,
      deleteUserUseCase,
    );
    const createUserRouter = new CreateUserRouter(userController);
    const udpateRouter = new UpdateUserRouter(userController);
    const readAllOrFilterUserRouter = new ReadAllOrSearchUserRouter(
      userController,
    );
    const readByIdUserRouter = new ReadByIdUserRouter(userController);
    const deleteUserRouter = new DeleteUserRouter(userController);

    this.router.post('/users', createUserRouter);
    this.router.put('/users', udpateRouter);
    this.router.get('/users', readAllOrFilterUserRouter);
    this.router.get('/users/:id', readByIdUserRouter);
    this.router.delete('/users', deleteUserRouter);
  }
}
