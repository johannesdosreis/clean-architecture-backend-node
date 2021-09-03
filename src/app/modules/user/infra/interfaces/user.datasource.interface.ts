import { UserModel } from '../models/user.model';

export interface IUserDataSource {
  createUser(name: string, email: string): Promise<UserModel>;
}
