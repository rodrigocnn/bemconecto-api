import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Result } from '@/application/shared/result';
import { Patient } from '@/domain/patients/entities/patient';

import { CreatePatientInput } from './dtos/create-patient.input';

export class CreatePatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async execute(input: CreatePatientInput): Promise<Result<Patient>> {
    try {
      const patient = new Patient({
        ...input,
      } as Patient);

      await this.patientRepository.create(patient);

      return Result.ok(patient);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
