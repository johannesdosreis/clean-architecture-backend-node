import { ICreateUserCallArgs } from '../../domain/usecases/create.user';
import { IUserDataSource } from '../../infra/interfaces/user.datasource.interface';
import { UserModel } from '../../infra/models/user.model';

export class MemoryUserDataSource implements IUserDataSource {
  users: UserModel[] = [];
  index = 0;
  createUser(args: ICreateUserCallArgs): Promise<UserModel> {
    const user = new UserModel({
      id: this.index.toString(),
      name: args.name,
      email: args.email,
    });
    this.index++;

    const newIndex = this.users.push(user);
    return Promise.resolve(this.users[newIndex - 1]);
  }
}
