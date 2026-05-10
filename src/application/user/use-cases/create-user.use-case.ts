import { HashProvider } from '@/application/auth/providers/hash.provider';
import { UserRepository } from '@/application/user/repositories/user.repository';
import { Result } from '@/application/shared/result';
import { User } from '@/domain/user/entities/user';
import { UserType } from '@/domain/user/enums/user-type';

export interface CreateUserUseCaseInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  userType: UserType;
  professionalId: string;
}

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(input: CreateUserUseCaseInput): Promise<Result<User>> {
    try {
      const user = new User({
        ...input,
      } as User);

      const hashedPassword = await this.hashProvider.hash(input.password);
      user.updatePasswordHash(hashedPassword);

      await this.userRepository.create(user);
      return Result.ok(user);
    } catch (error) {
      return Result.fail(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
