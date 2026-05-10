import { Gender } from '@/domain/professional/enums/gender';
import { InMemoryPatientRepository } from '@/infra/patient/repositories/in-memory-patient.repository';

import { CreatePatientUseCase } from './create-patient.use-case';
import { UpdatePatientUseCase } from './update-patient.use-case';

describe('UpdatePatientUseCase', () => {
  it('should update an existing patient', async () => {
    const patientRepository = new InMemoryPatientRepository();
    const createPatientUseCase = new CreatePatientUseCase(patientRepository);
    const sut = new UpdatePatientUseCase(patientRepository);

    const createResult = await createPatientUseCase.execute({
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

    expect(createResult.success).toBe(true);
    if (!createResult.success) {
      return;
    }

    const result = await sut.execute(createResult.data.id, {
      name: 'Maria Oliveira',
      phone: '63911111111',
      notes: 'Notas atualizadas',
      gender: Gender.MALE,
      birthDate: new Date('1991-06-21'),
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe(createResult.data.id);
      expect(result.data.name).toBe('Maria Oliveira');
      expect(result.data.phone).toBe('63911111111');
      expect(result.data.notes).toBe('Notas atualizadas');
      expect(result.data.gender).toBe(Gender.MALE);
      expect(result.data.birthDate).toEqual(new Date('1991-06-21'));
    }

    expect(patientRepository.items[0].name).toBe('Maria Oliveira');
  });

  it('should return failure when patient does not exist', async () => {
    const patientRepository = new InMemoryPatientRepository();
    const sut = new UpdatePatientUseCase(patientRepository);

    const result = await sut.execute('non-existing-id', {
      name: 'Maria Oliveira',
    });

    expect(result).toEqual({
      success: false,
      error: 'Patient not found',
    });
  });
});
