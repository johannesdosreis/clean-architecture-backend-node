import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { IUser } from '../interfaces/user.entity.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';

export class ReadByFilterUserUseCase {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async call(filter: string): Promise<Either<Failure, IUser[]>> {
    return await this.userRepository.readByFilterUserRepository(filter);
  }
}
