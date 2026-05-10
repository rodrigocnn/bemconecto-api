import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TOKEN_PROVIDER } from '@/application/auth/providers/token.provider';
import { LoginUseCase } from '@/application/auth/use-cases/login.use-case';
import { USER_REPOSITORY } from '@/application/user/repositories/user.repository';

import { AuthController } from '@/presentation/auth/controllers/auth.controller';

import { JwtTokenProvider } from './providers/jwt-token.provider';
import { HASH_PROVIDER } from '@/application/auth/providers/hash.provider';
import { BcryptHashProvider } from '../bcrypt/bcrypt-hash.provider';
import { UserModule } from '@/infra/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN as '7d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    BcryptHashProvider,
    JwtTokenProvider,

    {
      provide: HASH_PROVIDER,
      useExisting: BcryptHashProvider,
    },

    {
      provide: TOKEN_PROVIDER,
      useExisting: JwtTokenProvider,
    },

    {
      provide: LoginUseCase,
      useFactory: (userRepository, hashProvider, tokenProvider) =>
        new LoginUseCase(userRepository, hashProvider, tokenProvider),
      inject: [USER_REPOSITORY, HASH_PROVIDER, TOKEN_PROVIDER],
    },
  ],
})
export class AuthModule {}
