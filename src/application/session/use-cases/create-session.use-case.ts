import { Session } from '@/domain/session/entities/session';
import { SessionRepository } from '@/application/session/repositories/session.repository';
import { CreateSessionDto } from '@/domain/session/dtos/create-session.dto';
import { Result } from '@/application/shared/result';

export class CreateSessionUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(input: CreateSessionDto): Promise<Result<Session>> {
    try {
      const session = new Session(input);
      await this.sessionRepository.create(session);

      return Result.ok(session);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
