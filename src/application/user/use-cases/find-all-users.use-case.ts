import { UserRepository } from '../repositories/user.repository';
import { Result } from '@/application/shared/result';
import { User } from '@/domain/user/entities/user';

export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Result<User[]>> {
    try {
      const users = await this.userRepository.findAll();

      return Result.ok(users);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
