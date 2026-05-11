import { Appointment } from '@/domain/appointment/entities/appointment';

export class AppointmentMapper {
  static toHttp(appointment: Appointment) {
    return {
      id: appointment.id,
      title: appointment.title,
      startAt: appointment.startAt,
      endAt: appointment.endAt,
      status: appointment.status,
      backgroundColor: appointment.backgroundColor,
      textColor: appointment.textColor,
      display: appointment.display,
      professionalId: appointment.professionalId,
      patientId: appointment.patientId,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    };
  }

  static toHttpMany(appointments: Appointment[]) {
    return appointments.map((appointment) => this.toHttp(appointment));
  }
}
