import { Session } from '@/domain/session/entities/session';
import { UpdateSessionDto } from '@/presentation/session/dtos/update-session.dto';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface SessionRepository {
  create(session: Session): Promise<void>;
  findAll(): Promise<Session[]>;
  update(id: string, data: UpdateSessionDto): Promise<Session | null>;
  delete(id: string): Promise<Session | null>;
}
