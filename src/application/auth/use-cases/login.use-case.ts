import { HashProvider } from '@/application/auth/providers/hash.provider';
import { TokenProvider } from '@/application/auth/providers/token.provider';
import { Result } from '@/application/shared/result';
import { UserRepository } from '@/application/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { LoginUserDto } from '@/presentation/auth/dto/login-user.dto';

export type LoginUseCaseResponse = {
  accessToken: string;
  user: User;
};

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async execute(input: LoginUserDto): Promise<Result<LoginUseCaseResponse>> {
    try {
      const user = await this.userRepository.findByEmail(input.email);

      if (!user) {
        return Result.fail('Invalid credentials');
      }

      const passwordMatch = await this.hashProvider.compare(
        input.password,
        user.password,
      );

      if (!passwordMatch) {
        return Result.fail('Invalid credentials');
      }

      const accessToken = await this.tokenProvider.sign({
        sub: user.id,
        email: user.email,
        role: user.userType,
      });

      return Result.ok({
        accessToken,
        user,
      });
    } catch (error) {
      return Result.fail(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
