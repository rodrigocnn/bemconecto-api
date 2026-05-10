import { Gender } from '@/domain/professional/enums/gender';
import { InMemoryProfessionalRepository } from '@/infra/professional/repositories/in-memory-professional.repository';

import { CreateProfessionalUseCase } from './create-professional.use-case';
import { UpdateProfessionalUseCase } from './update-professional.use-case';

describe('UpdateProfessionalUseCase', () => {
  it('should update an existing professional', async () => {
    const professionalRepository = new InMemoryProfessionalRepository();
    const createProfessionalUseCase = new CreateProfessionalUseCase(
      professionalRepository,
    );
    const sut = new UpdateProfessionalUseCase(professionalRepository);

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

    const result = await sut.execute(createResult.data.id, {
      name: 'Maria Oliveira',
      phone: '63911111111',
      notes: 'Notas atualizadas',
      gender: Gender.MALE,
      birthDate: new Date('1991-06-21'),
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe(createResult.data.id);
      expect(result.data.name).toBe('Maria Oliveira');
      expect(result.data.phone).toBe('63911111111');
      expect(result.data.notes).toBe('Notas atualizadas');
      expect(result.data.gender).toBe(Gender.MALE);
      expect(result.data.birthDate).toEqual(new Date('1991-06-21'));
    }

    expect(professionalRepository.items[0].name).toBe('Maria Oliveira');
  });

  it('should return failure when professional does not exist', async () => {
    const professionalRepository = new InMemoryProfessionalRepository();
    const sut = new UpdateProfessionalUseCase(professionalRepository);

    const result = await sut.execute('non-existing-id', {
      name: 'Maria Oliveira',
    });

    expect(result).toEqual({
      success: false,
      error: 'Professional not found',
    });
  });
});
