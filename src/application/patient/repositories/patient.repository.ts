import { Patient } from '@/domain/patients/entities/patient';

export const PATIENT_REPOSITORY = Symbol('PATIENT_REPOSITORY');

export interface PatientRepository {
  create(patient: Patient): Promise<void>;
  findAll(professionalId?: string): Promise<Patient[]>;
  findById(id: string, professionalId?: string): Promise<Patient | null>;
  update(patient: Patient): Promise<void>;
  delete(id: string, professionalId?: string): Promise<boolean>;
}
