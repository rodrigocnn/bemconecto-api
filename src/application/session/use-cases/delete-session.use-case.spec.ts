import { Session } from '@/domain/session/entities/session';
import { InMemorySessionRepository } from '@/infra/session/repositories/in-memory-session.repository';
import { DeleteSessionUseCase } from './delete-session.use-case';

describe('DeleteSessionUseCase', () => {
  it('should soft delete an existing session', async () => {
    const sessionRepository = new InMemorySessionRepository();
    const sut = new DeleteSessionUseCase(sessionRepository);

    const session = new Session({
      patientId: 'patient-1',
      sessionDate: new Date('2026-05-01T10:00:00.000Z'),
      summary: 'Resumo',
    });

    await sessionRepository.create(session);

    const result = await sut.execute(session.id);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe(session.id);
      expect(result.data.deletedAt).toBeInstanceOf(Date);
    }

    expect(await sessionRepository.findAll()).toHaveLength(0);
  });

  it('should return failure when session does not exist', async () => {
    const sessionRepository = new InMemorySessionRepository();
    const sut = new DeleteSessionUseCase(sessionRepository);

    const result = await sut.execute('non-existing-id');

    expect(result).toEqual({
      success: false,
      error: 'Session with id "non-existing-id" not found',
    });
  });
});
