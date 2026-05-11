import { Session } from '@/domain/session/entities/session';
import { InMemorySessionRepository } from '@/infra/session/repositories/in-memory-session.repository';
import { FindAllSessionsUseCase } from './find-all-sessions.use-case';

describe('FindAllSessionsUseCase', () => {
  it('should return all sessions from the same professional', async () => {
    const sessionRepository = new InMemorySessionRepository();
    const sut = new FindAllSessionsUseCase(sessionRepository);

    const firstSession = new Session({
      professionalId: 'professional-1',
      patientId: 'patient-1',
      sessionDate: new Date('2026-05-01T10:00:00.000Z'),
      summary: 'Primeira sessao',
    });

    const secondSession = new Session({
      professionalId: 'professional-1',
      patientId: 'patient-2',
      sessionDate: new Date('2026-05-02T10:00:00.000Z'),
      summary: 'Segunda sessao',
    });

    const anotherProfessionalSession = new Session({
      professionalId: 'professional-2',
      patientId: 'patient-3',
      sessionDate: new Date('2026-05-03T10:00:00.000Z'),
      summary: 'Outra sessao',
    });

    await sessionRepository.create(firstSession);
    await sessionRepository.create(secondSession);
    await sessionRepository.create(anotherProfessionalSession);

    const result = await sut.execute('professional-1');

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual([firstSession, secondSession]);
  });
});
