import { Injectable } from '@nestjs/common';
import {
  UpdateUserRepositoryInput,
  UserRepository,
} from '@/application/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findAll(): Promise<User[]> {
    return this.items.filter((item) => !item.deletedAt);
  }

  async findByEmail(email: string): Promise<User | null> {
    return (
      this.items.find((item) => item.email === email && !item.deletedAt) ?? null
    );
  }

  async update(id: string, data: UpdateUserRepositoryInput): Promise<User | null> {
    const userIndex = this.items.findIndex(
      (item) => item.id === id && !item.deletedAt,
    );

    if (userIndex === -1) {
      return null;
    }

    const currentUser = this.items[userIndex];
    const updatedUser = new User({
      ...currentUser,
      ...data,
      updatedAt: new Date(),
    } as User);

    this.items[userIndex] = updatedUser;

    return updatedUser;
  }

  async delete(id: string): Promise<User | null> {
    const userIndex = this.items.findIndex(
      (item) => item.id === id && !item.deletedAt,
    );

    if (userIndex === -1) {
      return null;
    }

    const currentUser = this.items[userIndex];
    const deletedUser = new User({
      ...currentUser,
      deletedAt: new Date(),
      updatedAt: new Date(),
    } as User);

    this.items[userIndex] = deletedUser;

    return deletedUser;
  }
}
