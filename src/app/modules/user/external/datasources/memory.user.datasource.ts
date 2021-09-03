import { IUserDataSource } from '../../infra/interfaces/user.datasource.interface';
import { UserModel } from '../../infra/models/user.model';

export class MemoryUserDataSource implements IUserDataSource {
  users: UserModel[] = [];
  index = 0;
  createUser(name: string, email: string): Promise<UserModel> {
    const user = new UserModel(this.index.toString(), name, email);
    this.index++;

    const newIndex = this.users.push(user);
    console.log(this.users);
    return Promise.resolve(this.users[newIndex - 1]);
  }
}
