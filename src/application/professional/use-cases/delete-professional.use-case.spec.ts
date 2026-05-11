import { Gender } from '@/domain/professional/enums/gender';
import { InMemoryProfessionalRepository } from '@/infra/professional/repositories/in-memory-professional.repository';

import { CreateProfessionalUseCase } from './create-professional.use-case';
import { DeleteProfessionalUseCase } from './delete-professional.use-case';

describe('DeleteProfessionalUseCase', () => {
  it('should delete an existing professional', async () => {
    const professionalRepository = new InMemoryProfessionalRepository();
    const createProfessionalUseCase = new CreateProfessionalUseCase(
      professionalRepository,
    );
    const sut = new DeleteProfessionalUseCase(professionalRepository);

    const createResult = await createProfessionalUseCase.execute({
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '12345678900',
      rg: '1234567',
      phone: '63999999999',
      birthDate: new Date('1990-05-20'),
      crp: '06/12345',
      notes: 'Anotacoes',
      gender: Gender.FEMALE,
    });

    expect(createResult.success).toBe(true);
    if (!createResult.success) {
      return;
    }

    const result = await sut.execute(createResult.data.id, createResult.data.id);

    expect(result).toEqual({
      success: true,
      data: true,
    });
    expect(professionalRepository.items[0].deletedAt).toBeInstanceOf(Date);
  });

  it('should return failure when professional does not exist', async () => {
    const professionalRepository = new InMemoryProfessionalRepository();
    const sut = new DeleteProfessionalUseCase(professionalRepository);

    const result = await sut.execute('non-existing-id', 'professional-1');

    expect(result).toEqual({
      success: false,
      error: 'Professional not found',
    });
  });
});
