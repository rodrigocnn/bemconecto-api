import { Injectable } from '@nestjs/common';

import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Patient } from '@/domain/patients/entities/patient';

@Injectable()
export class InMemoryPatientRepository implements PatientRepository {
  items: Patient[] = [];

  async create(patient: Patient): Promise<void> {
    this.items.push(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.items.filter((patient) => !patient.deletedAt);
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = this.items.find((item) => item.id === id && !item.deletedAt);
    return patient ?? null;
  }

  async update(patient: Patient): Promise<void> {
    const index = this.items.findIndex((item) => item.id === patient.id);

    if (index === -1) {
      return;
    }

    patient.updatedAt = new Date();
    this.items[index] = patient;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === id && !item.deletedAt);

    if (index === -1) {
      return false;
    }

    this.items[index].deletedAt = new Date();
    this.items[index].updatedAt = new Date();

    return true;
  }
}
