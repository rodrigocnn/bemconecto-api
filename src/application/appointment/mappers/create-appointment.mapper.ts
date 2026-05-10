import {
  DEFAULT_APPOINTMENT_DISPLAY,
  DEFAULT_APPOINTMENT_STATUS,
  getAppointmentColors,
} from '@/application/appointment/utils/appointment-colors';
import { Appointment } from '@/domain/appointment/entities/appointment';
import { CreateAppointmentDto } from '@/presentation/appointment/dtos/create-appointment.dto';

export class CreateAppointmentMapper {
  static toDomain(input: CreateAppointmentDto, patientName: string): Appointment {
    const status = DEFAULT_APPOINTMENT_STATUS;
    const { backgroundColor, textColor } = getAppointmentColors(status);

    return new Appointment({
      title: patientName,
      startAt: input.startAt,
      endAt: input.endAt,
      status,
      backgroundColor,
      textColor,
      display: DEFAULT_APPOINTMENT_DISPLAY,
      professionalId: input.professionalId,
      patientId: input.patientId,
    });
  }
}
