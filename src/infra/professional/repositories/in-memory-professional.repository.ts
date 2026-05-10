import { Injectable } from '@nestjs/common';
import { ProfessionalRepository } from '@/application/professional/repositories/professional.repository';
import { Professional } from '@/domain/professional/entities/professional';

@Injectable()
export class InMemoryProfessionalRepository implements ProfessionalRepository {
  items: Professional[] = [];

  async create(professional: Professional): Promise<void> {
    this.items.push(professional);
  }

  async findAll(): Promise<Professional[]> {
    return this.items;
  }

  async findById(id: string): Promise<Professional | null> {
    const professional = this.items.find((item) => item.id === id);
    return professional ?? null;
  }

  async update(professional: Professional): Promise<void> {
    const index = this.items.findIndex((item) => item.id === professional.id);

    if (index === -1) {
      return;
    }

    professional.updatedAt = new Date();
    this.items[index] = professional;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this.items[index].deletedAt = new Date();
    this.items[index].updatedAt = new Date();

    return true;
  }
}
