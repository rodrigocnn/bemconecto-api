import { Gender } from '@/domain/professional/enums/gender';
import { InMemoryPatientRepository } from '@/infra/patient/repositories/in-memory-patient.repository';

import { CreatePatientUseCase } from './create-patient.use-case';
import { DeletePatientUseCase } from './delete-patient.use-case';

describe('DeletePatientUseCase', () => {
  it('should delete an existing patient', async () => {
    const patientRepository = new InMemoryPatientRepository();
    const createPatientUseCase = new CreatePatientUseCase(patientRepository);
    const sut = new DeletePatientUseCase(patientRepository);

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

    const result = await sut.execute(createResult.data.id);

    expect(result).toEqual({
      success: true,
      data: true,
    });
    expect(patientRepository.items[0].deletedAt).toBeInstanceOf(Date);
  });

  it('should return failure when patient does not exist', async () => {
    const patientRepository = new InMemoryPatientRepository();
    const sut = new DeletePatientUseCase(patientRepository);

    const result = await sut.execute('non-existing-id');

    expect(result).toEqual({
      success: false,
      error: 'Patient not found',
    });
  });
});
