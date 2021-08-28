import * as http from 'http';

export interface IServerAdapter {
  listen(
    port: number,
    hostname: string,
    backlog: number,
    callback?: () => void
  ): http.Server;
}
