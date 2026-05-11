import {
  SessionRepository,
} from '@/application/session/repositories/session.repository';
import { Session } from '@/domain/session/entities/session';
import { UpdateSessionDto } from '@/presentation/session/dtos/update-session.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemorySessionRepository implements SessionRepository {
  items: Session[] = [];

  async create(session: Session): Promise<void> {
    this.items.push(session);
  }

  async findAll(professionalId: string): Promise<Session[]> {
    return this.items.filter(
      (item) => !item.deletedAt && item.professionalId === professionalId,
    );
  }

  async update(
    id: string,
    data: UpdateSessionDto,
    professionalId: string,
  ): Promise<Session | null> {
    const sessionIndex = this.items.findIndex(
      (item) =>
        item.id === id &&
        !item.deletedAt &&
        item.professionalId === professionalId,
    );

    if (sessionIndex === -1) {
      return null;
    }

    const currentSession = this.items[sessionIndex];
    const updatedSession = new Session({
      ...currentSession,
      ...data,
      updatedAt: new Date(),
    } as Session);

    this.items[sessionIndex] = updatedSession;

    return updatedSession;
  }

  async delete(id: string, professionalId: string): Promise<Session | null> {
    const sessionIndex = this.items.findIndex(
      (item) =>
        item.id === id &&
        !item.deletedAt &&
        item.professionalId === professionalId,
    );

    if (sessionIndex === -1) {
      return null;
    }

    const currentSession = this.items[sessionIndex];
    const deletedSession = new Session({
      ...currentSession,
      deletedAt: new Date(),
      updatedAt: new Date(),
    } as Session);

    this.items[sessionIndex] = deletedSession;

    return deletedSession;
  }
}
