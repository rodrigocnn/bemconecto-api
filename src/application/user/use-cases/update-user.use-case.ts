import {
  UpdateUserRepositoryInput,
  UserRepository,
} from '@/application/user/repositories/user.repository';
import { Result } from '@/application/shared/result';
import { User } from '@/domain/user/entities/user';
import { UserType } from '@/domain/user/enums/user-type';

export interface UpdateUserUseCaseInput {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  userType?: UserType;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    input: UpdateUserUseCaseInput,
    professionalId: string,
  ): Promise<Result<User>> {
    try {
      const { id, ...data } = input;
      const updateData: UpdateUserRepositoryInput = {
        ...data,
      };

      const user = await this.userRepository.update(
        id,
        updateData,
        professionalId,
      );

      if (!user) {
        return Result.fail(`User with id "${id}" not found`);
      }

      return Result.ok(user);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
