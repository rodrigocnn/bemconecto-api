import { Professional } from '@/domain/professional/entities/professional';

export const PROFESSIONAL_REPOSITORY = Symbol('PROFESSIONAL_REPOSITORY');

export interface ProfessionalRepository {
  create(professional: Professional): Promise<void>;
  findAll(): Promise<Professional[]>;
  findById(id: string): Promise<Professional | null>;
  update(professional: Professional): Promise<void>;
  delete(id: string): Promise<boolean>;
}
