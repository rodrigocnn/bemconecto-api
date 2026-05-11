import { Gender } from '@/domain/professional/enums/gender';

export class CreatePatientDto {
  name!: string;
  email!: string;
  cpf!: string;
  rg?: string;
  phone!: string;
  birthDate!: Date;
  notes?: string;
  gender!: Gender;
}
