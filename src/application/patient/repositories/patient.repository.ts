import { Patient } from '@/domain/patients/entities/patient';

export const PATIENT_REPOSITORY = Symbol('PATIENT_REPOSITORY');

export interface PatientRepository {
  create(patient: Patient): Promise<void>;
  findAll(): Promise<Patient[]>;
  findById(id: string): Promise<Patient | null>;
  update(patient: Patient): Promise<void>;
  delete(id: string): Promise<boolean>;
}
