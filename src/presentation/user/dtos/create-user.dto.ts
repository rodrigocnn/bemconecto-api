import { UserType } from '@/domain/user/enums/user-type';

export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  phone?: string;
  userType!: UserType;
  professionalId!: string;
}
