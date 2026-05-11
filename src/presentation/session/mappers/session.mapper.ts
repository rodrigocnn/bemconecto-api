import { Session } from '@/domain/session/entities/session';
import { User } from '@/domain/user/entities/user';

export class SessionMapper {
  static toHttp(session: Session) {
    return {
      id: session.id,
      professionalId: session.professionalId,
      patientId: session.patientId,
      sessionDate: session.sessionDate,
      summary: session.summary,
      behavioralObservations: session.behavioralObservations,
      interventions: session.interventions,
      patientReactions: session.patientReactions,
      referrals: session.referrals,
      therapeuticPlans: session.therapeuticPlans,
      diagnosticHypotheses: session.diagnosticHypotheses,
      techniqueUsed: session.techniqueUsed,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  }

  static toHttpMany(sessions: Session[]) {
    return sessions.map((session) => this.toHttp(session));
  }
}
