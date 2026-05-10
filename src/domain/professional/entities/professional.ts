import { Gender } from '../enums/gender';

export class Professional {
  id!: string;
  name!: string;
  email!: string;
  cpf!: string;
  rg?: string;
  phone!: string;
  birthDate!: Date;
  crp?: string;
  notes?: string;
  gender!: Gender;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  constructor(props: Professional) {
    Object.assign(this, props);

    this.id = props.id ?? crypto.randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}
