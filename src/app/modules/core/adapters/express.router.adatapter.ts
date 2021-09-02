import express from 'express';
import { IRouterAdapter } from '../interfaces/router.adapter.interface';
import { IRouter } from '../interfaces/router.interface';

export class ExpressRouterAdapter implements IRouterAdapter {
  router: express.Router;
  constructor() {
    this.router = express.Router();
  }

  get(path: string, router: IRouter) {
    this.router.get(path, ExpressRouterAdapter.adapt(router));
  }

  post(path: string, router: IRouter) {
    this.router.post(path, ExpressRouterAdapter.adapt(router));
  }

  put(path: string, router: IRouter) {
    this.router.post(path, ExpressRouterAdapter.adapt(router));
  }

  patch(path: string, router: IRouter) {
    this.router.patch(path, ExpressRouterAdapter.adapt(router));
  }

  delete(path: string, router: IRouter) {
    this.router.delete(path, ExpressRouterAdapter.adapt(router));
  }

  static adapt(router: IRouter) {
    return async (req: express.Request, res: express.Response) => {
      const httpRequest = {
        body: req.body,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
