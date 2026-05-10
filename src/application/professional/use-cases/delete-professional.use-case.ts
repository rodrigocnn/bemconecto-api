import { ProfessionalRepository } from '@/application/professional/repositories/professional.repository';
import { Result } from '@/application/shared/result';

export class DeleteProfessionalUseCase {
  constructor(
    private readonly professionalRepository: ProfessionalRepository,
  ) {}

  async execute(id: string): Promise<Result<boolean>> {
    try {
      const professional = await this.professionalRepository.findById(id);

      if (!professional) {
        return Result.fail('Professional not found');
      }

      await this.professionalRepository.delete(id);

      return Result.ok(true);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
