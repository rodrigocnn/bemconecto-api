import { User } from '@/domain/user/entities/user';
import { UserType } from '@/domain/user/enums/user-type';
import { InMemoryUserRepository } from '@/infra/user/repositories/in-memory-user.repository';
import { DeleteUserUseCase } from './delete-user.use-case';

describe('DeleteUserUseCase', () => {
  it('should soft delete an existing user', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new DeleteUserUseCase(userRepository);

    const user = new User({
      name: 'Maria Silva',
      email: 'maria@example.com',
      password: '123456',
      userType: UserType.PROFESSIONAL,
      professionalId: 'professional-1',
      phone: '63999999999',
    } as User);

    await userRepository.create(user);

    const result = await sut.execute(user.id, 'professional-1');

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.id).toBe(user.id);
      expect(result.data.deletedAt).toBeInstanceOf(Date);
    }

    expect(await userRepository.findAll('professional-1')).toHaveLength(0);
  });

  it('should return failure when user does not exist', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new DeleteUserUseCase(userRepository);

    const result = await sut.execute('non-existing-id', 'professional-1');

    expect(result).toEqual({
      success: false,
      error: 'User with id "non-existing-id" not found',
    });
  });
});
