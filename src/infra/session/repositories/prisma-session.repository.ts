import { Injectable } from '@nestjs/common';

import { SessionRepository } from '@/application/session/repositories/session.repository';
import { Session } from '@/domain/session/entities/session';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { UpdateSessionDto } from '@/presentation/session/dtos/update-session.dto';

@Injectable()
export class PrismaSessionRepository implements SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(session: Session): Promise<void> {
    await this.prisma.client.session.create({
      data: {
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
        deletedAt: session.deletedAt,
      },
    });
  }

  async findAll(professionalId: string): Promise<Session[]> {
    const sessions = await this.prisma.client.session.findMany({
      where: {
        professionalId,
        deletedAt: null,
      },
    });

    return sessions.map((session) => new Session(session));
  }

  async update(
    id: string,
    data: UpdateSessionDto,
    professionalId: string,
  ): Promise<Session | null> {
    const existingSession = await this.prisma.client.session.findFirst({
      where: {
        id,
        professionalId,
        deletedAt: null,
      },
    });

    if (!existingSession) {
      return null;
    }

    const updatedSession = await this.prisma.client.session.update({
      where: {
        id,
      },
      data: {
        ...data,
        sessionDate: data.sessionDate ? new Date(data.sessionDate) : undefined,
      },
    });

    return new Session(updatedSession);
  }

  async delete(id: string, professionalId: string): Promise<Session | null> {
    const existingSession = await this.prisma.client.session.findFirst({
      where: {
        id,
        professionalId,
        deletedAt: null,
      },
    });

    if (!existingSession) {
      return null;
    }

    const deletedSession = await this.prisma.client.session.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return new Session(deletedSession);
  }
}
