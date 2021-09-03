import { IUser } from '~/src/app/modules/user/domain/interfaces/user.entity.interface';
import { UserModel } from '../models/user.model';

export interface IUserDataSource {
  createUserDataSource(name: string, email: string): Promise<UserModel>;
  readAllUserDataSource(): Promise<UserModel[]>;
  readByIdUserDataSource(id: string): Promise<UserModel>;
  readByFilterUserDataSource(filter: string): Promise<UserModel[]>;
  updateUserDataSource(user: IUser): Promise<UserModel>;
  deleteUserDataSource(id: string): Promise<void>;
}
