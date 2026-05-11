import { Injectable } from '@nestjs/common';
import {
  UpdateUserRepositoryInput,
  UserRepository,
} from '@/application/user/repositories/user.repository';
import { User } from '@/domain/user/entities/user';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.client.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        userType: user.userType,
        professionalId: user.professionalId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
    });
  }

  async findAll(professionalId?: string): Promise<User[]> {
    const users = await this.prisma.client.user.findMany({
      where: {
        deletedAt: null,
        ...(professionalId ? { professionalId } : {}),
      },
    });

    return users.map((user) => new User(user as User));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.client.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });

    return user ? new User(user as User) : null;
  }

  async update(
    id: string,
    data: UpdateUserRepositoryInput,
    professionalId?: string,
  ): Promise<User | null> {
    const existingUser = await this.prisma.client.user.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(professionalId ? { professionalId } : {}),
      },
    });

    if (!existingUser) {
      return null;
    }

    const updatedUser = await this.prisma.client.user.update({
      where: { id },
      data,
    });

    return new User(updatedUser as User);
  }

  async delete(id: string, professionalId?: string): Promise<User | null> {
    const existingUser = await this.prisma.client.user.findFirst({
      where: {
        id,
        deletedAt: null,
        ...(professionalId ? { professionalId } : {}),
      },
    });

    if (!existingUser) {
      return null;
    }

    const deletedUser = await this.prisma.client.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return new User(deletedUser as User);
  }
}
