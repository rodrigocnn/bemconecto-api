import { Result } from '@/application/shared/result';
import { SessionRepository } from '@/application/session/repositories/session.repository';
import { Session } from '@/domain/session/entities/session';
import { UpdateSessionDto } from '@/presentation/session/dtos/update-session.dto';

export class UpdateSessionUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(
    id: string,
    input: UpdateSessionDto,
    professionalId: string,
  ): Promise<Result<Session>> {
    try {
      const session = await this.sessionRepository.update(
        id,
        input,
        professionalId,
      );

      if (!session) {
        return Result.fail(`Session with id "${id}" not found`);
      }

      return Result.ok(session);
    } catch (error) {
      return Result.fail(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
