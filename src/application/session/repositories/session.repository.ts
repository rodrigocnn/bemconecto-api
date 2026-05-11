import { Session } from '@/domain/session/entities/session';
import { UpdateSessionDto } from '@/presentation/session/dtos/update-session.dto';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface SessionRepository {
  create(session: Session): Promise<void>;
  findAll(professionalId: string): Promise<Session[]>;
  update(
    id: string,
    data: UpdateSessionDto,
    professionalId: string,
  ): Promise<Session | null>;
  delete(id: string, professionalId: string): Promise<Session | null>;
}
