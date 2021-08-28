import { IUser } from '../interfaces/user.entity.interface';

export class User implements IUser {
  id: string;
  name: string;
  email: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
