import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { IUser } from '../interfaces/user.entity.interface';
import { IUserRepository } from '../interfaces/user.repository.interface';

export class ReadByIdUserUseCase {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async call(id: string): Promise<Either<Failure, IUser>> {
    return await this.userRepository.readByIdUserRepository(id);
  }
}
