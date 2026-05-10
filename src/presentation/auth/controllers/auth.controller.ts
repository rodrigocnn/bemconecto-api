import { Body, Controller, Post } from '@nestjs/common';

import { LoginUseCase } from '@/application/auth/use-cases/login.use-case';
import { Result } from '@/application/shared/result';
import { getErrorMessage } from '@/presentation/shared/get-error-message';

import { LoginUserDto } from '../dto/login-user.dto';
import { AuthMapper, LoginResponse } from '../mappers/auth.mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<Result<LoginResponse>> {
    const result = await this.loginUseCase.execute(body);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: AuthMapper.toHttp(result.data),
    };
  }
}
