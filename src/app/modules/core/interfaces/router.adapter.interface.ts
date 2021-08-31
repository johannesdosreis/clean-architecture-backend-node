import { IRouter } from './router.interface';

export interface IRouterAdapter {
  get(path: string, router: IRouter): void;
  post(path: string, router: IRouter): void;
  put(path: string, router: IRouter): void;
  patch(path: string, router: IRouter): void;
  delete(path: string, router: IRouter): void;
}
