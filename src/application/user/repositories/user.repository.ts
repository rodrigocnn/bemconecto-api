import { User } from '@/domain/user/entities/user';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UpdateUserRepositoryInput {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  userType?: User['userType'];
  professionalId?: string;
}

export interface UserRepository {
  create(user: User): Promise<void>;
  findAll(professionalId?: string): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  update(
    id: string,
    data: UpdateUserRepositoryInput,
    professionalId?: string,
  ): Promise<User | null>;
  delete(id: string, professionalId?: string): Promise<User | null>;
}
