import { Result } from '@/application/shared/result';
import { PatientRepository } from '@/application/patient/repositories/patient.repository';

export class DeletePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(id: string): Promise<Result<boolean>> {
    try {
      const patient = await this.patientRepository.findById(id);

      if (!patient) {
        return Result.fail('Patient not found');
      }

      await this.patientRepository.delete(id);

      return Result.ok(true);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
