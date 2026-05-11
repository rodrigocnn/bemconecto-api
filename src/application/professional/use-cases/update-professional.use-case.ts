import { ProfessionalRepository } from '@/application/professional/repositories/professional.repository';
import { Result } from '@/application/shared/result';
import { Professional } from '@/domain/professional/entities/professional';

import { UpdateProfessionalDto } from '@/presentation/professional/dtos/update-professional-dto';

export class UpdateProfessionalUseCase {
  constructor(
    private readonly professionalRepository: ProfessionalRepository,
  ) {}

  async execute(
    id: string,
    input: UpdateProfessionalDto,
    professionalId: string,
  ): Promise<Result<Professional>> {
    try {
      const professional = await this.professionalRepository.findById(
        id,
        professionalId,
      );

      if (!professional) {
        return Result.fail('Professional not found');
      }

      professional.update(input);
      await this.professionalRepository.update(professional);

      return Result.ok(professional);
    } catch (error) {
      return Result.fail(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
