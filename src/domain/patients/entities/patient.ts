import { Gender } from '@/domain/professional/enums/gender';

export class Patient {
  id!: string;
  name!: string;
  email!: string;
  cpf!: string;
  rg?: string;
  phone!: string;
  birthDate!: Date;
  notes?: string;
  gender!: Gender;
  professionalId: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  constructor(props: Patient) {
    Object.assign(this, props);

    this.id = props.id ?? crypto.randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
