import { ProfessionalRepository } from '@/application/professional/repositories/professional.repository';
import { Result } from '@/application/shared/result';
import { Professional } from '@/domain/professional/entities/professional';
import { CreateProfessionalDto } from '@/presentation/professional/dtos/create-professional.dto';

export class CreateProfessionalUseCase {
  constructor(
    private readonly professionalRepository: ProfessionalRepository,
  ) {}

  async execute(input: CreateProfessionalDto): Promise<Result<Professional>> {
    try {
      const professional = new Professional(input);
      await this.professionalRepository.create(professional);

      return Result.ok(professional);
    } catch (error) {
      return Result.fail(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
