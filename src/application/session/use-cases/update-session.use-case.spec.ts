import { Session } from '@/domain/session/entities/session';
import { InMemorySessionRepository } from '@/infra/session/repositories/in-memory-session.repository';
import { UpdateSessionUseCase } from './update-session.use-case';

describe('UpdateSessionUseCase', () => {
  it('should update an existing session', async () => {
    const sessionRepository = new InMemorySessionRepository();
    const sut = new UpdateSessionUseCase(sessionRepository);

    const session = new Session({
      professionalId: 'professional-1',
      patientId: 'patient-1',
      sessionDate: new Date('2026-05-01T10:00:00.000Z'),
      summary: 'Resumo antigo',
    });

    await sessionRepository.create(session);

    const result = await sut.execute(
      session.id,
      {
        summary: 'Resumo atualizado',
        techniqueUsed: 'TCC',
      },
      'professional-1',
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe(session.id);
      expect(result.data.summary).toBe('Resumo atualizado');
      expect(result.data.techniqueUsed).toBe('TCC');
    }

    expect(sessionRepository.items[0].summary).toBe('Resumo atualizado');
  });

  it('should return failure when session does not exist', async () => {
    const sessionRepository = new InMemorySessionRepository();
    const sut = new UpdateSessionUseCase(sessionRepository);

    const result = await sut.execute(
      'non-existing-id',
      {
        summary: 'Novo resumo',
      },
      'professional-1',
    );

    expect(result).toEqual({
      success: false,
      error: 'Session with id "non-existing-id" not found',
    });
  });
});
