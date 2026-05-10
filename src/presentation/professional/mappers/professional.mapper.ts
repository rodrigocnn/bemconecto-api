import { Professional } from '@/domain/professional/entities/professional';

export class ProfessionalMapper {
  static toHttp(professional: Professional) {
    return {
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
    };
  }
}
