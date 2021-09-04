import { Either } from 'fp-ts/lib/Either';
import { Failure } from '../errors/failure';
import { IUserRepository } from '../interfaces/user.repository.interface';

export class DeleteUserUseCase {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async call(id: string): Promise<Either<Failure, null>> {
    return await this.userRepository.deleteUserRepository(id);
  }
}
