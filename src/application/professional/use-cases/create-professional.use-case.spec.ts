import { CreateProfessionalUseCase } from './create-professional.use-case';
import { Gender } from '@/domain/professional/enums/gender';
import { InMemoryProfessionalRepository } from '@/infra/professional/repositories/in-memory-professional.repository';

describe('CreateProfessionalUseCase', () => {
  it('should create a professional and store it in repository', async () => {
    const professionalRepository = new InMemoryProfessionalRepository();
    const sut = new CreateProfessionalUseCase(professionalRepository);

    const result = await sut.execute({
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

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data.id).toBeDefined();
    expect(result.data.createdAt).toBeInstanceOf(Date);
    expect(professionalRepository.items).toHaveLength(1);
    expect(professionalRepository.items[0]).toEqual(result.data);
  });
});
