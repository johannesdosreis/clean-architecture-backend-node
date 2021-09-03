import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { IUser } from '../interfaces/user.entity.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';

export class ReadAllUserUseCase {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async call(): Promise<Either<Failure, IUser[]>> {
    return await this.userRepository.readAllUserRepository();
  }
}
