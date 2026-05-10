import { Session } from '@/domain/session/entities/session';
import { InMemorySessionRepository } from '@/infra/session/repositories/in-memory-session.repository';
import { FindAllSessionsUseCase } from './find-all-sessions.use-case';

describe('FindAllSessionsUseCase', () => {
  it('should return all sessions from repository', async () => {
    const sessionRepository = new InMemorySessionRepository();
    const sut = new FindAllSessionsUseCase(sessionRepository);

    const firstSession = new Session({
      patientId: 'patient-1',
      sessionDate: new Date('2026-05-01T10:00:00.000Z'),
      summary: 'Primeira sessao',
    });

    const secondSession = new Session({
      patientId: 'patient-2',
      sessionDate: new Date('2026-05-02T10:00:00.000Z'),
      summary: 'Segunda sessao',
    });

    await sessionRepository.create(firstSession);
    await sessionRepository.create(secondSession);

    const result = await sut.execute();

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual([firstSession, secondSession]);
  });
});
