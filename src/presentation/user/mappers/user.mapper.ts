import { User } from '@/domain/user/entities/user';

export class UserMapper {
  static toHttp(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      userType: user.userType,
      professionalId: user.professionalId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toHttpMany(users: User[]) {
    return users.map((user) => this.toHttp(user));
  }
}
