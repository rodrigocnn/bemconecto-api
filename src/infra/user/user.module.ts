import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from '@/application/user/repositories/user.repository';
import { CreateUserUseCase } from '@/application/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '@/application/user/use-cases/delete-user.use-case';
import { FindAllUsersUseCase } from '@/application/user/use-cases/find-all-users.use-case';
import { UpdateUserUseCase } from '@/application/user/use-cases/update-user.use-case';
import { HashProvider } from '@/application/auth/providers/hash.provider';
import { BcryptHashProvider } from '@/infra/bcrypt/bcrypt-hash.provider';
import { UserController } from '@/presentation/user/controllers/user.controller';
import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { PrismaUserRepository } from './repositories/prisma-user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    PrismaUserRepository,
    BcryptHashProvider,
    {
      provide: USER_REPOSITORY,
      useExisting: PrismaUserRepository,
    },
    {
      provide: HashProvider,
      useExisting: BcryptHashProvider,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: PrismaUserRepository,
        hashProvider: HashProvider,
      ) => new CreateUserUseCase(userRepository, hashProvider),
      inject: [USER_REPOSITORY, HashProvider],
    },
    {
      provide: FindAllUsersUseCase,
      useFactory: (userRepository: PrismaUserRepository) =>
        new FindAllUsersUseCase(userRepository),
      inject: [USER_REPOSITORY],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: PrismaUserRepository) =>
        new UpdateUserUseCase(userRepository),
      inject: [USER_REPOSITORY],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (userRepository: PrismaUserRepository) =>
        new DeleteUserUseCase(userRepository),
      inject: [USER_REPOSITORY],
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
