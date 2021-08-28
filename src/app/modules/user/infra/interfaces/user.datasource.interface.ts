import { ICreateUserCallArgs } from '../../domain/usecases/create.user';
import { UserModel } from '../models/user.model';

export interface IUserDataSource {
  createUser(args: ICreateUserCallArgs): Promise<UserModel>;
}
