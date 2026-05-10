import { Gender } from '@/domain/professional/enums/gender';
import { Patient } from '@/domain/patients/entities/patient';
import { InMemoryPatientRepository } from '@/infra/patient/repositories/in-memory-patient.repository';

import { FindAllPatientsUseCase } from './find-all-patients.use-case';

describe('FindAllPatientsUseCase', () => {
  it('should return all non-deleted patients', async () => {
    const patientRepository = new InMemoryPatientRepository();
    const sut = new FindAllPatientsUseCase(patientRepository);

    const activePatient = new Patient({
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '12345678900',
      rg: '1234567',
      phone: '63999999999',
      birthDate: new Date('1990-05-20'),
      notes: 'Anotacoes',
      gender: Gender.FEMALE,
      professionalId: 'professional-1',
    } as Patient);

    const deletedPatient = new Patient({
      name: 'Joao Lima',
      email: 'joao@example.com',
      cpf: '12345678901',
      phone: '63988888888',
      birthDate: new Date('1992-08-14'),
      gender: Gender.MALE,
      professionalId: 'professional-1',
      deletedAt: new Date(),
    } as Patient);

    await patientRepository.create(activePatient);
    await patientRepository.create(deletedPatient);

    const result = await sut.execute();

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data).toHaveLength(1);
    expect(result.data[0].id).toBe(activePatient.id);
  });
});
