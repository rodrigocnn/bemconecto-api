import { AppointmentRepository } from '@/application/appointment/repositories/appointment.repository';
import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Appointment } from '@/domain/appointment/entities/appointment';
import { Patient } from '@/domain/patients/entities/patient';
import { Gender } from '@/domain/professional/enums/gender';
import { UpdateAppointmentUseCase } from './update-appointment.use-case';

class InMemoryAppointmentRepository implements AppointmentRepository {
  items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.items.filter((item) => !item.deletedAt);
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.items.find((item) => item.id === id && !item.deletedAt) ?? null;
  }

  async update(appointment: Appointment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === appointment.id);

    if (index === -1) {
      return;
    }

    this.items[index] = appointment;
  }

  async delete(id: string): Promise<boolean> {
    const appointment = await this.findById(id);

    if (!appointment) {
      return false;
    }

    appointment.delete();
    return true;
  }
}

class InMemoryPatientRepository implements PatientRepository {
  items: Patient[] = [];

  async create(patient: Patient): Promise<void> {
    this.items.push(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.items.filter((item) => !item.deletedAt);
  }

  async findById(id: string): Promise<Patient | null> {
    return this.items.find((item) => item.id === id && !item.deletedAt) ?? null;
  }

  async update(patient: Patient): Promise<void> {
    const index = this.items.findIndex((item) => item.id === patient.id);

    if (index === -1) {
      return;
    }

    this.items[index] = patient;
  }

  async delete(id: string): Promise<boolean> {
    const patient = await this.findById(id);

    if (!patient) {
      return false;
    }

    patient.deletedAt = new Date();
    return true;
  }
}

describe('UpdateAppointmentUseCase', () => {
  it('should update appointment status, visual props and title with patient name', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const patientRepository = new InMemoryPatientRepository();
    const sut = new UpdateAppointmentUseCase(appointmentRepository, patientRepository);

    const patient = new Patient({
      name: 'Maria Silva',
      email: 'maria@example.com',
      cpf: '12345678901',
      phone: '63999999999',
      birthDate: new Date('1992-01-01T00:00:00.000Z'),
      gender: Gender.FEMALE,
      professionalId: 'professional-1',
    } as Patient);

    const appointment = new Appointment({
      title: 'Sessao inicial',
      startAt: new Date('2026-05-08T10:00:00.000Z'),
      endAt: new Date('2026-05-08T11:00:00.000Z'),
      status: 'SCHEDULED',
      professionalId: 'professional-1',
      patientId: 'patient-legacy',
    });

    await patientRepository.create(patient);
    await appointmentRepository.create(appointment);

    const result = await sut.execute(appointment.id, {
      patientId: patient.id,
      status: 'CONFIRMED',
      backgroundColor: '#fff',
      textColor: '#000',
      display: 'block',
    });

    expect(result.success).toBe(true);

    if (!result.success) {
      return;
    }

    expect(result.data.patientId).toBe(patient.id);
    expect(result.data.title).toBe('Maria Silva');
    expect(result.data.status).toBe('CONFIRMED');
    expect(result.data.backgroundColor).toBe('#fff');
  });

  it('should fail when appointment does not exist', async () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const patientRepository = new InMemoryPatientRepository();
    const sut = new UpdateAppointmentUseCase(appointmentRepository, patientRepository);

    const result = await sut.execute('non-existing-id', { status: 'CONFIRMED' });

    expect(result).toEqual({
      success: false,
      error: 'Appointment not found',
    });
  });
});
