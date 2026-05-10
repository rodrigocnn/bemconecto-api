import { ProfessionalRepository } from '@/application/professional/repositories/professional.repository';
import { Result } from '@/application/shared/result';
import { Professional } from '@/domain/professional/entities/professional';

export class FindAllProfessionalsUseCase {
  constructor(
    private readonly professionalRepository: ProfessionalRepository,
  ) {}

  async execute(): Promise<Result<Professional[]>> {
    try {
      const professionals = await this.professionalRepository.findAll();

      return Result.ok(professionals);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
