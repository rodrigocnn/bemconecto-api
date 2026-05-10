import { User } from '@/domain/user/entities/user';

export type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
};

type LoginMapperInput = {
  accessToken: string;
  user: User;
};

export class AuthMapper {
  static toHttp({ accessToken, user }: LoginMapperInput): LoginResponse {
    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.userType,
      },
    };
  }
}
