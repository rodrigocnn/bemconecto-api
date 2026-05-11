import { Injectable } from '@nestjs/common';

import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Patient } from '@/domain/patients/entities/patient';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(patient: Patient): Promise<void> {
    await this.prisma.client.patient.create({
      data: {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        cpf: patient.cpf,
        rg: patient.rg,
        phone: patient.phone,
        birthDate: patient.birthDate,
        notes: patient.notes,
        gender: patient.gender,
        professionalId: patient.professionalId,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
        deletedAt: patient.deletedAt,
      },
    });
  }

  async findAll(professionalId?: string): Promise<Patient[]> {
    const patients = await this.prisma.client.patient.findMany({
      where: {
        deletedAt: null,
        ...(professionalId ? { professionalId } : {}),
      },
    });

    return patients.map((patient) => new Patient(patient as unknown as Patient));
  }

  async findById(id: string, professionalId?: string): Promise<Patient | null> {
    const patient = await this.prisma.client.patient.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(professionalId ? { professionalId } : {}),
      },
    });

    if (!patient) {
      return null;
    }

    return new Patient(patient as unknown as Patient);
  }

  async update(patient: Patient): Promise<void> {
    await this.prisma.client.patient.update({
      where: {
        id: patient.id,
      },
      data: {
        name: patient.name,
        phone: patient.phone,
        birthDate: patient.birthDate,
        notes: patient.notes,
        gender: patient.gender,
      },
    });
  }

  async delete(id: string, professionalId?: string): Promise<boolean> {
    const result = await this.prisma.client.patient.updateMany({
      where: {
        id,
        deletedAt: null,
        ...(professionalId ? { professionalId } : {}),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return result.count > 0;
  }
}
