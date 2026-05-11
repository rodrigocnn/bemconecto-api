import { Gender } from '@/domain/professional/enums/gender';

export type CreatePatientInput = {
  name: string;
  email: string;
  cpf: string;
  rg?: string;
  phone: string;
  birthDate: Date;
  notes?: string;
  gender: Gender;
  professionalId: string;
};
