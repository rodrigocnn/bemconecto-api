import { Gender } from '@/domain/professional/enums/gender';

export class UpdatePatientDto {
  name?: string;
  phone?: string;
  birthDate?: Date;
  notes?: string;
  gender?: Gender;
}
