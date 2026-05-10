import { Gender } from '@/domain/professional/enums/gender';

export class CreateProfessionalDto {
  name!: string;
  email!: string;
  cpf!: string;
  rg?: string;
  phone!: string;
  birthDate!: Date;
  crp?: string;
  notes?: string;
  gender!: Gender;
}
