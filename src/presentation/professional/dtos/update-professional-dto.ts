import { Gender } from '@/domain/professional/enums/gender';

export class UpdateProfessionalDto {
  name?: string;
  phone?: string;
  birthDate?: Date;
  notes?: string;
  gender?: Gender;
}
