import { Gender } from '@/domain/professional/enums/gender';
import { InMemoryPatientRepository } from '@/infra/patient/repositories/in-memory-patient.repository';

import { CreatePatientUseCase } from './create-patient.use-case';

describe('CreatePatientUseCase', () => {
  it('should create a patient and store it in repository', async () => {
    const patientRepository = new InMemoryPatientRepository();
    const sut = new CreatePatientUseCase(patientRepository);

    const result = await sut.execute({
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '12345678900',
      rg: '1234567',
      phone: '63999999999',
      birthDate: new Date('1990-05-20'),
      notes: 'Anotacoes',
      gender: Gender.FEMALE,
      professionalId: 'professional-1',
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data.id).toBeDefined();
    expect(result.data.createdAt).toBeInstanceOf(Date);
    expect(patientRepository.items).toHaveLength(1);
    expect(patientRepository.items[0]).toEqual(result.data);
  });
});
