import { AppointmentRepository } from '@/application/appointment/repositories/appointment.repository';
import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { CreateAppointmentUseCase } from '@/application/appointment/use-cases/create-appointment.use-case';
import { Appointment } from '@/domain/appointment/entities/appointment';
import { Patient } from '@/domain/patients/entities/patient';
import { Gender } from '@/domain/professional/enums/gender';

class InMemoryAppointmentRepository implements AppointmentRepository {
  items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findAll(professionalId: string): Promise<Appointment[]> {
    return this.items.filter((item) => item.professionalId === professionalId);
  }

  async findById(id: string, professionalId?: string): Promise<Appointment | null> {
    const appointment = this.items.find(
      (item) => item.id === id && (professionalId ? item.professionalId === professionalId : true),
    );
    return appointment ?? null;
  }

  async update(appointment: Appointment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === appointment.id);

    if (index === -1) {
      return;
    }

    appointment.updatedAt = new Date();
    this.items[index] = appointment;
  }

  async delete(id: string, professionalId?: string): Promise<boolean> {
    const index = this.items.findIndex(
      (item) => item.id === id && (professionalId ? item.professionalId === professionalId : true),
    );

    if (index === -1) {
      return false;
    }

    this.items[index].delete();

    return true;
  }
}

class InMemoryPatientRepository implements PatientRepository {
  items: Patient[] = [];

  async create(patient: Patient): Promise<void> {
    this.items.push(patient);
  }

  async findAll(professionalId?: string): Promise<Patient[]> {
    return this.items.filter(
      (item) =>
        !item.deletedAt &&
        (professionalId ? item.professionalId === professionalId : true),
    );
  }

  async findById(id: string, professionalId?: string): Promise<Patient | null> {
    const patient = this.items.find(
      (item) =>
        item.id === id &&
        !item.deletedAt &&
        (professionalId ? item.professionalId === professionalId : true),
    );
    return patient ?? null;
  }

  async update(patient: Patient): Promise<void> {
    const index = this.items.findIndex((item) => item.id === patient.id);

    if (index === -1) {
      return;
    }

    this.items[index] = patient;
  }

  async delete(id: string, professionalId?: string): Promise<boolean> {
    const index = this.items.findIndex(
      (item) =>
        item.id === id &&
        !item.deletedAt &&
        (professionalId ? item.professionalId === professionalId : true),
    );

    if (index === -1) {
      return false;
    }

    this.items[index].deletedAt = new Date();
    return true;
  }
}

describe('CreateAppointmentUseCase', () => {
  it('should create an appointment and store it in repository', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const patientRepository = new InMemoryPatientRepository();
    const sut = new CreateAppointmentUseCase(
      appointmentRepository,
      patientRepository,
    );

    const patient = new Patient({
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '12345678901',
      phone: '63999999999',
      birthDate: new Date('1992-01-01T00:00:00.000Z'),
      gender: Gender.FEMALE,
      professionalId: 'professional-1',
    } as Patient);

    await patientRepository.create(patient);

    const result = await sut.execute({
      startAt: new Date('2026-05-08T10:00:00.000Z'),
      endAt: new Date('2026-05-08T11:00:00.000Z'),
      professionalId: 'professional-1',
      patientId: patient.id,
    });

    expect(result.success).toBe(true);
    if (!result.success) {
      return;
    }

    expect(result.data.id).toBeDefined();
    expect(result.data.title).toBe('Maria Silva');
    expect(result.data.status).toBe('SCHEDULED');
    expect(result.data.backgroundColor).toBe('#E0F2FE');
    expect(result.data.textColor).toBe('#0C4A6E');
    expect(result.data.display).toBe('block');
    expect(result.data.createdAt).toBeInstanceOf(Date);
    expect(result.data.updatedAt).toBeInstanceOf(Date);
    expect(appointmentRepository.items).toHaveLength(1);
    expect(appointmentRepository.items[0]).toEqual(result.data);
  });

  it('should return error when startAt is invalid', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const patientRepository = new InMemoryPatientRepository();
    const sut = new CreateAppointmentUseCase(
      appointmentRepository,
      patientRepository,
    );

    const patient = new Patient({
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '12345678901',
      phone: '63999999999',
      birthDate: new Date('1992-01-01T00:00:00.000Z'),
      gender: Gender.FEMALE,
      professionalId: 'professional-1',
    } as Patient);

    await patientRepository.create(patient);

    const result = await sut.execute({
      startAt: 'invalid-date' as unknown as Date,
      endAt: new Date('2026-05-08T11:00:00.000Z'),
      professionalId: 'professional-1',
      patientId: patient.id,
    });

    expect(result.success).toBe(false);
    if (result.success) {
      return;
    }

    expect(result.error).toBe('Invalid startAt');
  });

  it('should return failure when patient does not exist', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const patientRepository = new InMemoryPatientRepository();
    const sut = new CreateAppointmentUseCase(
      appointmentRepository,
      patientRepository,
    );

    const result = await sut.execute({
      startAt: new Date('2026-05-08T10:00:00.000Z'),
      endAt: new Date('2026-05-08T11:00:00.000Z'),
      professionalId: 'professional-1',
      patientId: 'patient-unknown',
    });

    expect(result).toEqual({
      success: false,
      error: 'Patient not found',
    });
  });

  it('should return failure when patient belongs to another professional', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const patientRepository = new InMemoryPatientRepository();
    const sut = new CreateAppointmentUseCase(
      appointmentRepository,
      patientRepository,
    );

    const patient = new Patient({
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '12345678901',
      phone: '63999999999',
      birthDate: new Date('1992-01-01T00:00:00.000Z'),
      gender: Gender.FEMALE,
      professionalId: 'professional-2',
    } as Patient);

    await patientRepository.create(patient);

    const result = await sut.execute({
      startAt: new Date('2026-05-08T10:00:00.000Z'),
      endAt: new Date('2026-05-08T11:00:00.000Z'),
      professionalId: 'professional-1',
      patientId: patient.id,
    });

    expect(result).toEqual({
      success: false,
      error: 'Patient not found',
    });
  });
});
