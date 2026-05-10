import { UserType } from '@/domain/user/enums/user-type';
import { HashProvider } from '@/application/auth/providers/hash.provider';
import { InMemoryUserRepository } from '@/infra/user/repositories/in-memory-user.repository';
import { CreateUserUseCase } from './create-user.use-case';

class FakeHashProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return `hashed:${password}`;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return hash === `hashed:${password}`;
  }
}

describe('CreateUserUseCase', () => {
  it('should create a user and store it in repository', async () => {
    const userRepository = new InMemoryUserRepository();
    const hashProvider = new FakeHashProvider();
    const sut = new CreateUserUseCase(userRepository, hashProvider);

    const result = await sut.execute({
      name: 'Maria Silva',
      email: 'maria@example.com',
      password: '123456',
      userType: UserType.PROFESSIONAL,
      professionalId: 'professional-1',
      phone: '63999999999',
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data.id).toBeDefined();
    expect(result.data.password).toBe('hashed:123456');
    expect(result.data.createdAt).toBeInstanceOf(Date);
    expect(userRepository.items).toHaveLength(1);
    expect(userRepository.items[0]).toEqual(result.data);
  });
});
