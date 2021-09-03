import { IUser } from '~/src/app/modules/user/domain/interfaces/user.entity.interface';
import { IUserDataSource } from '../../infra/interfaces/user.datasource.interface';
import { UserModel } from '../../infra/models/user.model';

export class MemoryUserDataSource implements IUserDataSource {
  users: UserModel[] = [];
  index = 0;
  createUserDataSource(name: string, email: string): Promise<UserModel> {
    const user = new UserModel(this.index.toString(), name, email);
    this.index++;

    const newIndex = this.users.push(user);
    return Promise.resolve(this.users[newIndex - 1]);
  }

  readAllUserDataSource(): Promise<UserModel[]> {
    return Promise.resolve(this.users);
  }

  readByIdUserDataSource(id: string): Promise<UserModel> {
    const user = this.users.filter(user => user.id === id);

    return Promise.resolve(user[0]);
  }

  readByFilterUserDataSource(filter: string): Promise<UserModel[]> {
    const usersFiltered = this.users.filter(
      user => user.email.includes(filter) || user.name.includes(filter),
    );
    return Promise.resolve(usersFiltered);
  }

  updateUserDataSource(user: IUser): Promise<UserModel> {
    const userUpdated = this.users.filter(usr => usr.id === user.id)[0];

    userUpdated.email = user.email;
    userUpdated.name = user.name;

    return Promise.resolve(userUpdated);
  }

  deleteUserDataSource(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
    return Promise.resolve();
  }
}
