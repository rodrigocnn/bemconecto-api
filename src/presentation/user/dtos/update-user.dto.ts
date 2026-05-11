import { UserType } from '@/domain/user/enums/user-type';

export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  userType?: UserType;
}
