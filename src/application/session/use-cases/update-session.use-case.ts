import { Result } from '@/application/shared/result';
import {
  SessionRepository,
  UpdateSessionRepositoryInput,
} from '@/application/session/repositories/session.repository';
import { Session } from '@/domain/session/entities/session';

export interface UpdateSessionUseCaseInput {
  id: string;
  patientId?: string;
  sessionDate?: Date;
  summary?: string;
  behavioralObservations?: string;
  interventions?: string;
  patientReactions?: string;
  referrals?: string;
  therapeuticPlans?: string;
  diagnosticHypotheses?: string;
  techniqueUsed?: string;
}

export class UpdateSessionUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(input: UpdateSessionUseCaseInput): Promise<Result<Session>> {
    try {
      const { id, ...data } = input;
      const updateData: UpdateSessionRepositoryInput = {
        ...data,
      };

      const session = await this.sessionRepository.update(id, updateData);

      if (!session) {
        return Result.fail(`Session with id "${id}" not found`);
      }

      return Result.ok(session);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
