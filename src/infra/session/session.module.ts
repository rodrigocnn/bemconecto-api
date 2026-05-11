import { Module } from '@nestjs/common';
import { SESSION_REPOSITORY } from '@/application/session/repositories/session.repository';
import { CreateSessionUseCase } from '@/application/session/use-cases/create-session.use-case';
import { DeleteSessionUseCase } from '@/application/session/use-cases/delete-session.use-case';
import { FindAllSessionsUseCase } from '@/application/session/use-cases/find-all-sessions.use-case';
import { UpdateSessionUseCase } from '@/application/session/use-cases/update-session.use-case';
import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { SessionController } from '@/presentation/session/controllers/session.controller';

import { PrismaSessionRepository } from './repositories/prisma-session.repository';

@Module({
  imports: [PrismaModule],
  controllers: [SessionController],
  providers: [
    PrismaSessionRepository,
    {
      provide: SESSION_REPOSITORY,
      useExisting: PrismaSessionRepository,
    },
    {
      provide: CreateSessionUseCase,
      useFactory: (sessionRepository: PrismaSessionRepository) =>
        new CreateSessionUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: FindAllSessionsUseCase,
      useFactory: (sessionRepository: PrismaSessionRepository) =>
        new FindAllSessionsUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: UpdateSessionUseCase,
      useFactory: (sessionRepository: PrismaSessionRepository) =>
        new UpdateSessionUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: DeleteSessionUseCase,
      useFactory: (sessionRepository: PrismaSessionRepository) =>
        new DeleteSessionUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
  ],
})
export class SessionModule {}
