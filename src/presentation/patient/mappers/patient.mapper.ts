import { Patient } from '@/domain/patients/entities/patient';

export class PatientMapper {
  static toHttp(patient: Patient) {
    return {
      id: patient.id,
      name: patient.name,
      email: patient.email,
      cpf: patient.cpf,
      rg: patient.rg,
      phone: patient.phone,
      birthDate: patient.birthDate,
      notes: patient.notes,
      gender: patient.gender,
      professionalId: patient.professionalId,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
    };
  }

  static toHttpMany(patients: Patient[]) {
    return patients.map((patient) => this.toHttp(patient));
  }
}
