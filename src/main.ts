import dotenv from 'dotenv';
import { App } from './app/app';
import { ExpressAppAdapter } from './app/modules/core/adapters/express.app.adapter';
import { WinstonLoggerAdapter } from './app/modules/core/adapters/winston.logger.adapter';

dotenv.config();

const main = () => {
  const app = new App({
    app: new ExpressAppAdapter(),
    logger: new WinstonLoggerAdapter(),
  });
  app.start();
};

main();
