import { ProfessionalRepository } from '@/application/professional/repositories/professional.repository';
import { Result } from '@/application/shared/result';

export class DeleteProfessionalUseCase {
  constructor(
    private readonly professionalRepository: ProfessionalRepository,
  ) {}

  async execute(id: string, professionalId: string): Promise<Result<boolean>> {
    try {
      const professional = await this.professionalRepository.findById(
        id,
        professionalId,
      );

      if (!professional) {
        return Result.fail('Professional not found');
      }

      await this.professionalRepository.delete(id, professionalId);

      return Result.ok(true);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
