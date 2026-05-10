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

  async findAll(): Promise<Patient[]> {
    const patients = await this.prisma.client.patient.findMany({
      where: {
        deletedAt: null,
      },
    });

    return patients.map(
      (patient) =>
        new Patient({
          ...(patient as unknown as Patient),
          birthDate: patient.birth,
        } as Patient),
    );
  }

  async findById(id: string): Promise<Patient | null> {
    const patient = await this.prisma.client.patient.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!patient) {
      return null;
    }

    return new Patient({
      ...(patient as unknown as Patient),
      birthDate: patient.birth,
    } as Patient);
  }

  async update(patient: Patient): Promise<void> {
    await this.prisma.client.patient.update({
      where: {
        id: patient.id,
      },
      data: {
        name: patient.name,
        phone: patient.phone,
        birth: patient.birthDate,
        notes: patient.notes,
        gender: patient.gender,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.client.patient.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return true;
  }
}
