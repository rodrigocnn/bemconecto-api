import { Injectable } from '@nestjs/common';
import { ProfessionalRepository } from '@/application/professional/repositories/professional.repository';
import { Professional } from '@/domain/professional/entities/professional';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaProfessionalRepository implements ProfessionalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(professional: Professional): Promise<void> {
    await this.prisma.client.professional.create({
      data: {
        id: professional.id,
        name: professional.name,
        email: professional.email,
        cpf: professional.cpf,
        rg: professional.rg,
        phone: professional.phone,
        birthDate: professional.birthDate,
        crp: professional.crp,
        notes: professional.notes,
        gender: professional.gender,
        createdAt: professional.createdAt,
        updatedAt: professional.updatedAt,
        deletedAt: professional.deletedAt,
      },
    });
  }

  async findAll(professionalId?: string): Promise<Professional[]> {
    const professionals = await this.prisma.client.professional.findMany({
      where: {
        deletedAt: null,
        ...(professionalId ? { id: professionalId } : {}),
      },
    });

    return professionals.map(
      (professional) => new Professional(professional as Professional),
    );
  }

  async findById(id: string, professionalId?: string): Promise<Professional | null> {
    const professional = await this.prisma.client.professional.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(professionalId ? { id: professionalId } : {}),
      },
    });

    if (!professional) {
      return null;
    }

    return new Professional(professional as Professional);
  }

  async update(professional: Professional): Promise<void> {
    await this.prisma.client.professional.update({
      where: {
        id: professional.id,
      },
      data: {
        name: professional.name,
        phone: professional.phone,
        birthDate: professional.birthDate,
        notes: professional.notes,
        gender: professional.gender,
      },
    });
  }

  async delete(id: string, professionalId?: string): Promise<boolean> {
    const result = await this.prisma.client.professional.updateMany({
      where: {
        id,
        deletedAt: null,
        ...(professionalId ? { id: professionalId } : {}),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return result.count > 0;
  }
}
