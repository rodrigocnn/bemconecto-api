import { Gender } from '../enums/gender';

export interface ProfessionalProps {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  rg?: string;
  phone: string;
  birthDate: Date | string;
  crp?: string;
  notes?: string;
  gender: Gender;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UpdateProfessionalProps {
  name?: string;
  phone?: string;
  birthDate?: Date | string;
  notes?: string;
  gender?: Gender;
}

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

  constructor(props: ProfessionalProps) {
    Object.assign(this, props);
    this.birthDate = new Date(props.birthDate);

    if (Number.isNaN(this.birthDate.getTime())) {
      throw new Error('Invalid birthDate');
    }

    this.id = props.id ?? crypto.randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  update(props: UpdateProfessionalProps): void {
    if (props.name !== undefined) {
      this.name = props.name;
    }

    if (props.phone !== undefined) {
      this.phone = props.phone;
    }

    if (props.notes !== undefined) {
      this.notes = props.notes;
    }

    if (props.gender !== undefined) {
      this.gender = props.gender;
    }

    if (props.birthDate !== undefined) {
      const birthDate = new Date(props.birthDate);

      if (Number.isNaN(birthDate.getTime())) {
        throw new Error('Invalid birthDate');
      }

      this.birthDate = birthDate;
    }

    this.updatedAt = new Date();
  }
}
