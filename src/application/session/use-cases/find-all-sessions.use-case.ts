import { Result } from '@/application/shared/result';
import { SessionRepository } from '@/application/session/repositories/session.repository';
import { Session } from '@/domain/session/entities/session';

export class FindAllSessionsUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(): Promise<Result<Session[]>> {
    try {
      const sessions = await this.sessionRepository.findAll();

      return Result.ok(sessions);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
