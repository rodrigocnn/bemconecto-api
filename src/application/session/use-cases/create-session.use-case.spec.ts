import { InMemorySessionRepository } from '@/infra/session/repositories/in-memory-session.repository';
import { CreateSessionUseCase } from './create-session.use-case';

describe('CreateSessionUseCase', () => {
  it('should create a session and store it in repository', async () => {
    const sessionRepository = new InMemorySessionRepository();
    const sut = new CreateSessionUseCase(sessionRepository);

    const result = await sut.execute({
      patientId: 'patient-123',
      sessionDate: new Date('2026-05-01T10:00:00.000Z'),
      summary: 'Paciente apresentou melhora no humor.',
      behavioralObservations: 'Postura mais aberta durante a consulta.',
      interventions: 'Escuta ativa e reestruturacao cognitiva.',
      patientReactions: 'Boa adesao as tecnicas propostas.',
      referrals: 'Sem encaminhamentos.',
      therapeuticPlans: 'Manter acompanhamento semanal.',
      diagnosticHypotheses: 'Sinais compativeis com ansiedade leve.',
      techniqueUsed: 'TCC',
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data.id).toBeDefined();
    expect(result.data.createdAt).toBeInstanceOf(Date);
    expect(result.data.updatedAt).toBeInstanceOf(Date);
    expect(sessionRepository.items).toHaveLength(1);
    expect(sessionRepository.items[0]).toEqual(result.data);
  });
});
