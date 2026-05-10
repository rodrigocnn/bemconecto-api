import { Result } from '@/application/shared/result';
import { UserRepository } from '@/application/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<Result<User>> {
    try {
      const user = await this.userRepository.delete(id);

      if (!user) {
        return Result.fail(`User with id "${id}" not found`);
      }

      return Result.ok(user);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
