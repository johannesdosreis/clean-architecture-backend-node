import express from 'express';
import { IAppAdapter } from '../interfaces/app.adapter.interface';

export class ExpressAppAdapter implements IAppAdapter {
  app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  use(callback: (...handlers: any[]) => any) {
    this.app.use(callback);
  }

  listen(port: number, hostname: string, callback: () => void) {
    this.app.listen(port, hostname, callback);
  }
}
