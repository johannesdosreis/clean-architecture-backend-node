export interface ILoggerAdapter {
  log(
    level: string,
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void;

  info(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void;

  warn(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void;

  debug(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void;

  error(
    message: string,
    callback?: (error?: any, level?: any, message?: any) => void,
  ): void;
}
