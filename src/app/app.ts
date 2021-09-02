import { ExpressRouterAdapter } from './modules/core/adapters/express.router.adatapter';
import { IAppAdapter } from './modules/core/interfaces/app.adapter.interface';
import { ILoggerAdapter } from './modules/core/interfaces/logger.adapter.interface';
import { UserModule } from './modules/user/user.module';

export interface IAppArgs {
  app: IAppAdapter;
  logger: ILoggerAdapter;
}

export class App {
  app: IAppAdapter;
  logger: ILoggerAdapter;

  constructor(args: IAppArgs) {
    this.app = args.app;
    this.logger = args.logger;

    this.setupModules();
  }

  setupModules(): void {
    const userRouter = new ExpressRouterAdapter();
    const userModule = new UserModule({ router: userRouter });
    userModule.setupRoutes();
    this.app.use(userRouter.router);
  }

  start(): void {
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || 'localhost';
    this.app.listen(parseInt(port.toString(), 10), host, () => {
      // eslint-disable-next-line no-console
      console.info(`Server started on ${host}:${port}`);
    });
  }
}
