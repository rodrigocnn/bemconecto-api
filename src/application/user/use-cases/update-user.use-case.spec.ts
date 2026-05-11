import { User } from '@/domain/user/entities/user';
import { UserType } from '@/domain/user/enums/user-type';
import { InMemoryUserRepository } from '@/infra/user/repositories/in-memory-user.repository';
import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  it('should update an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new UpdateUserUseCase(userRepository);

    const user = new User({
      name: 'Maria Silva',
      email: 'maria@example.com',
      password: '123456',
      userType: UserType.PROFESSIONAL,
      professionalId: 'professional-1',
      phone: '63999999999',
    } as User);

    await userRepository.create(user);

    const result = await sut.execute(
      {
        id: user.id,
        name: 'Maria Oliveira',
        phone: '63911111111',
        userType: UserType.ADMIN,
      },
      'professional-1',
    );

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe(user.id);
      expect(result.data.name).toBe('Maria Oliveira');
      expect(result.data.phone).toBe('63911111111');
      expect(result.data.userType).toBe(UserType.ADMIN);
    }

    expect(userRepository.items[0].name).toBe('Maria Oliveira');
  });

  it('should return failure when user does not exist', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new UpdateUserUseCase(userRepository);

    const result = await sut.execute(
      {
        id: 'non-existing-id',
        name: 'Maria Oliveira',
      },
      'professional-1',
    );

    expect(result).toEqual({
      success: false,
      error: 'User with id "non-existing-id" not found',
    });
  });
});
