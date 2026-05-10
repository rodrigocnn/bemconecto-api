import { Module } from '@nestjs/common';
import { SESSION_REPOSITORY } from '@/application/session/repositories/session.repository';
import { CreateSessionUseCase } from '@/application/session/use-cases/create-session.use-case';
import { DeleteSessionUseCase } from '@/application/session/use-cases/delete-session.use-case';
import { FindAllSessionsUseCase } from '@/application/session/use-cases/find-all-sessions.use-case';
import { UpdateSessionUseCase } from '@/application/session/use-cases/update-session.use-case';
import { SessionController } from '@/presentation/session/controllers/session.controller';
import { InMemorySessionRepository } from './repositories/in-memory-session.repository';

@Module({
  controllers: [SessionController],
  providers: [
    InMemorySessionRepository,
    {
      provide: SESSION_REPOSITORY,
      useExisting: InMemorySessionRepository,
    },
    {
      provide: CreateSessionUseCase,
      useFactory: (sessionRepository: InMemorySessionRepository) =>
        new CreateSessionUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: FindAllSessionsUseCase,
      useFactory: (sessionRepository: InMemorySessionRepository) =>
        new FindAllSessionsUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: UpdateSessionUseCase,
      useFactory: (sessionRepository: InMemorySessionRepository) =>
        new UpdateSessionUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
    {
      provide: DeleteSessionUseCase,
      useFactory: (sessionRepository: InMemorySessionRepository) =>
        new DeleteSessionUseCase(sessionRepository),
      inject: [SESSION_REPOSITORY],
    },
  ],
})
export class SessionModule {}
