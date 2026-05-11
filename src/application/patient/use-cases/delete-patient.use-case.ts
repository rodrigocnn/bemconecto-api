import { Result } from '@/application/shared/result';
import { PatientRepository } from '@/application/patient/repositories/patient.repository';

export class DeletePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(id: string, professionalId: string): Promise<Result<boolean>> {
    try {
      const patient = await this.patientRepository.findById(id, professionalId);

      if (!patient) {
        return Result.fail('Patient not found');
      }

      await this.patientRepository.delete(id, professionalId);

      return Result.ok(true);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
