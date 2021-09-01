import { IAppAdapter } from './modules/core/adapters/express.app.adapter';
import { ExpressRouterAdapter } from './modules/core/adapters/express.router.adatapter';
import { UserModule } from './modules/user/user.module';

export interface IAppArgs {
  app: IAppAdapter;
}

export class App {
  app: IAppAdapter;

  constructor(args: IAppArgs) {
    // this.app = express();
    this.app = args.app;

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
