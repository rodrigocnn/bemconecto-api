import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Result } from '@/application/shared/result';
import { Patient } from '@/domain/patients/entities/patient';

export class FindAllPatientsUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(): Promise<Result<Patient[]>> {
    try {
      const patients = await this.patientRepository.findAll();

      return Result.ok(patients);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
