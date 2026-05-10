import { UserType } from '../enums/user-type';

export class User {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  phone?: string;
  userType!: UserType;
  professionalId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  constructor(props: User) {
    Object.assign(this, props);

    this.id = props.id ?? crypto.randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  updatePasswordHash(passwordHash: string): void {
    this.password = passwordHash;
    this.updatedAt = new Date();
  }
}
