import {
  SessionRepository,
  UpdateSessionRepositoryInput,
} from '@/application/session/repositories/session.repository';
import { Session } from '@/domain/session/entities/session';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemorySessionRepository implements SessionRepository {
  items: Session[] = [];

  async create(session: Session): Promise<void> {
    this.items.push(session);
  }

  async findAll(): Promise<Session[]> {
    return this.items.filter((item) => !item.deletedAt);
  }

  async update(
    id: string,
    data: UpdateSessionRepositoryInput,
  ): Promise<Session | null> {
    const sessionIndex = this.items.findIndex(
      (item) => item.id === id && !item.deletedAt,
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

  async delete(id: string): Promise<Session | null> {
    const sessionIndex = this.items.findIndex(
      (item) => item.id === id && !item.deletedAt,
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
