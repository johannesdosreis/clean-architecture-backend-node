export interface IAppAdapter {
  use(callback: (...handlers: any[]) => any): any;
  listen(port: number, hostname: string, callback: () => void): any;
}
