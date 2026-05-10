import { Session } from '@/domain/session/entities/session';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface UpdateSessionRepositoryInput {
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

export interface SessionRepository {
  create(session: Session): Promise<void>;
  findAll(): Promise<Session[]>;
  update(id: string, data: UpdateSessionRepositoryInput): Promise<Session | null>;
  delete(id: string): Promise<Session | null>;
}
