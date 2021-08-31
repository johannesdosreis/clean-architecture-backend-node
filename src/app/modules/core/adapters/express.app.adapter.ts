import express from 'express';

export interface IAppAdapter {
  use(callback: (...handlers: any[]) => any): any;
  listen(port: number, hostname: string, callback: () => void): any;
}

export class ExpressAppAdapter implements IAppAdapter {
  app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  use(callback: (...handlers: any[]) => any) {
    this.app.use(callback);
  }

  listen(port: number, hostname: string, callback: () => void) {
    this.app.listen(port, hostname, callback);
  }
}
