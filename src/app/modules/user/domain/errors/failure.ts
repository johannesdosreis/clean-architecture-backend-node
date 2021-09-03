export interface Failure extends Error {}

export class ConnectionError implements Failure {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = 'connection-error';
    this.message = message;
  }
}

export class UserNotFoundError implements Failure {
  name: string;
  message: string;

  constructor(message: string) {
    this.name = 'user-not-found';
    this.message = message;
  }
}
