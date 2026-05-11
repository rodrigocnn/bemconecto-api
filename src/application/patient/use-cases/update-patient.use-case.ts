import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Result } from '@/application/shared/result';
import { Patient } from '@/domain/patients/entities/patient';
import { UpdatePatientDto } from '@/presentation/patient/dtos/update-patient.dto';

export class UpdatePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(
    id: string,
    input: UpdatePatientDto,
    professionalId: string,
  ): Promise<Result<Patient>> {
    try {
      const patient = await this.patientRepository.findById(id, professionalId);

      if (!patient) {
        return Result.fail('Patient not found');
      }

      Object.assign(patient, {
        ...input,
        birthDate: input.birthDate ? new Date(input.birthDate) : patient.birthDate,
      });

      await this.patientRepository.update(patient);

      return Result.ok(patient);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
