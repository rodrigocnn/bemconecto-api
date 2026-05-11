import { Result } from '@/application/shared/result';
import { SessionRepository } from '@/application/session/repositories/session.repository';
import { Session } from '@/domain/session/entities/session';

export class DeleteSessionUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(id: string, professionalId: string): Promise<Result<Session>> {
    try {
      const session = await this.sessionRepository.delete(id, professionalId);

      if (!session) {
        return Result.fail(`Session with id "${id}" not found`);
      }

      return Result.ok(session);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
