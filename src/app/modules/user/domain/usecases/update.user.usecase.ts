import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { IUser } from '../interfaces/user.entity.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';

export class UpdateUserUseCase {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async call(user: IUser): Promise<Either<Failure, IUser>> {
    return await this.userRepository.updateUserRepository(user);
  }
}
