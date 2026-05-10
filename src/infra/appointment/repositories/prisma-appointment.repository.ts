import { Injectable } from '@nestjs/common';

import { AppointmentRepository } from '@/application/appointment/repositories/appointment.repository';
import { Appointment } from '@/domain/appointment/entities/appointment';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

@Injectable()
export class PrismaAppoitmentRepository implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(appointment: Appointment): Promise<void> {
    await this.prisma.client.appointment.create({
      data: {
        id: appointment.id,
        startAt: appointment.startAt,
        endAt: appointment.endAt,
        status: appointment.status as never,
        backgroundColor: appointment.backgroundColor,
        textColor: appointment.textColor,
        display: appointment.display,
        notes: appointment.title,
        professionalId: appointment.professionalId,
        patientId: appointment.patientId,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
        deletedAt: appointment.deletedAt,
      },
    });
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await this.prisma.client.appointment.findMany({
      where: {
        deletedAt: null,
      },
    });

    return appointments.map((appointment) => this.toDomain(appointment));
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await this.prisma.client.appointment.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!appointment) {
      return null;
    }

    return this.toDomain(appointment);
  }

  async update(appointment: Appointment): Promise<void> {
    await this.prisma.client.appointment.update({
      where: {
        id: appointment.id,
      },
      data: {
        startAt: appointment.startAt,
        endAt: appointment.endAt,
        status: appointment.status as never,
        backgroundColor: appointment.backgroundColor,
        textColor: appointment.textColor,
        display: appointment.display,
        notes: appointment.title,
        professionalId: appointment.professionalId,
        patientId: appointment.patientId,
        deletedAt: appointment.deletedAt,
      },
    });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.client.appointment.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return true;
  }

  private toDomain(appointment: {
    id: string;
    startAt: Date;
    endAt: Date;
    status: string;
    backgroundColor: string | null;
    textColor: string | null;
    display: string | null;
    notes: string | null;
    professionalId: string;
    patientId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }): Appointment {
    return new Appointment({
      id: appointment.id,
      title: appointment.notes ?? '',
      startAt: appointment.startAt,
      endAt: appointment.endAt,
      status: appointment.status,
      backgroundColor: appointment.backgroundColor ?? undefined,
      textColor: appointment.textColor ?? undefined,
      display: appointment.display ?? undefined,
      professionalId: appointment.professionalId,
      patientId: appointment.patientId,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      deletedAt: appointment.deletedAt ?? undefined,
    } as Appointment);
  }
}
