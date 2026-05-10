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
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: UpdateUserRepositoryInput): Promise<User | null>;
  delete(id: string): Promise<User | null>;
}
