import { Appointment } from '@/domain/appointment/entities/appointment';

export const Appointment_REPOSITORY = Symbol('APPOINTMENT_REPOSITORY');

export interface AppointmentRepository {
  create(Appointment: Appointment): Promise<void>;
  findAll(id: string): Promise<Appointment[]>;
  findById(id: string): Promise<Appointment | null>;
  update(Appointment: Appointment): Promise<void>;
  delete(id: string): Promise<boolean>;
}
