import { UserModel } from '../models/user.model';
import { IUser } from '../../domain/interfaces/user.entity.interface';
export interface IUserDataSource {
  createUserDataSource(name: string, email: string): Promise<UserModel>;
  readAllUserDataSource(): Promise<UserModel[]>;
  readByIdUserDataSource(id: string): Promise<UserModel>;
  readByFilterUserDataSource(filter: string): Promise<UserModel[]>;
  updateUserDataSource(user: IUser): Promise<UserModel>;
  deleteUserDataSource(id: string): Promise<void>;
}
