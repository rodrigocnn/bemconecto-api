import { Injectable } from '@nestjs/common';

import { AppointmentRepository } from '@/application/appointment/repositories/appointment.repository';
import { Appointment } from '@/domain/appointment/entities/appointment';

@Injectable()
export class InMemoryAppointmentRepository implements AppointmentRepository {
  items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.items.filter((item) => !item.deletedAt);
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = this.items.find((item) => item.id === id && !item.deletedAt);
    return appointment ?? null;
  }

  async update(appointment: Appointment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === appointment.id && !item.deletedAt);

    if (index === -1) {
      return;
    }

    appointment.updatedAt = new Date();
    this.items[index] = appointment;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.items.findIndex((item) => item.id === id && !item.deletedAt);

    if (index === -1) {
      return false;
    }

    this.items[index].delete();

    return true;
  }
}
