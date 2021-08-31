import express from 'express';
import {
  ExpressAppAdapter,
  IAppAdapter,
} from './modules/core/adapters/express.app.adapter';
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
    const hostname = process.env.HOSTNAME || 'localhost';

    this.app.listen(parseInt(port.toString(), 10), hostname, () => {
      console.log(`Server started on ${hostname}:${port}`);
    });
  }
}
