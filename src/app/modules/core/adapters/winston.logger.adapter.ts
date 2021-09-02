import { createLogger, Logger, transports } from 'winston';
import { ILoggerAdapter } from '../interfaces/logger.adapter.interface';

export class WinstonLoggerAdapter implements ILoggerAdapter {
  logger: Logger;

  constructor() {
    this.logger = createLogger({
      // level: 'info',
      // format: format.combine(
      //   format.timestamp({
      //     format: 'YYYY-MM-DD HH:mm:ss',
      //   }),
      //   format.errors({ stack: true }),
      //   format.splat(),
      //   format.json(),
      // ),
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'info.log', level: 'info' }),
      ],
    });
  }

  log(
    level: string,
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void {
    this.logger.log(level, message, callback);
  }

  info(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void {
    this.logger.info(message, callback);
  }

  warn(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void {
    this.logger.warn(message, callback);
  }

  debug(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void {
    this.logger.debug(message, callback);
  }

  error(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void {
    this.logger.error(message, callback);
  }
}
