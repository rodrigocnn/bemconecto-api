import { Gender } from '@prisma/client';

export class UpdateProfessionalDto {
  name?: string;
  phone?: string;
  birthDate?: Date;
  notes?: string;
  gender?: Gender;
}
