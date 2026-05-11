import { Professional } from '@/domain/professional/entities/professional';

export const PROFESSIONAL_REPOSITORY = Symbol('PROFESSIONAL_REPOSITORY');

export interface ProfessionalRepository {
  create(professional: Professional): Promise<void>;
  findAll(professionalId?: string): Promise<Professional[]>;
  findById(id: string, professionalId?: string): Promise<Professional | null>;
  update(professional: Professional): Promise<void>;
  delete(id: string, professionalId?: string): Promise<boolean>;
}
