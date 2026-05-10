import { InMemoryUserRepository } from '@/infra/user/repositories/in-memory-user.repository';
import { User } from '@/domain/user/entities/user';
import { UserType } from '@/domain/user/enums/user-type';
import { FindAllUsersUseCase } from './find-all-users.use-case';

describe('FindAllUsersUseCase', () => {
  it('should return all users from repository', async () => {
    const userRepository = new InMemoryUserRepository();
    const sut = new FindAllUsersUseCase(userRepository);

    const firstUser = new User({
      name: 'Maria Silva',
      email: 'maria@example.com',
      password: '123456',
      userType: UserType.PROFESSIONAL,
      professionalId: 'professional-1',
      phone: '63999999999',
    } as User);

    const secondUser = new User({
      name: 'Joao Souza',
      email: 'joao@example.com',
      password: '654321',
      userType: UserType.ADMIN,
      professionalId: 'professional-1',
      phone: '63988888888',
    } as User);

    await userRepository.create(firstUser);
    await userRepository.create(secondUser);

    const result = await sut.execute();

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual([firstUser, secondUser]);
  });
});
