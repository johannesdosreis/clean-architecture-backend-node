import dotenv from 'dotenv';
import { App } from './app/app';
import { ExpressAppAdapter } from './app/modules/core/adapters/express.app.adapter';

dotenv.config();

const main = () => {
  const app = new App(new ExpressAppAdapter());
  app.start();
};

main();
