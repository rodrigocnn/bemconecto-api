import { AppointmentRepository } from '@/application/appointment/repositories/appointment.repository';
import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Result } from '@/application/shared/result';
import { Appointment } from '@/domain/appointment/entities/appointment';
import { UpdateAppointmentDto } from '@/presentation/appointment/dtos/update-appointment.dto';

export class UpdateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute(
    id: string,
    input: UpdateAppointmentDto,
    professionalId: string,
  ): Promise<Result<Appointment>> {
    try {
      const appointment = await this.appointmentRepository.findById(
        id,
        professionalId,
      );

      if (!appointment) {
        return Result.fail('Appointment not found');
      }

      if (input.patientId) {
        const patient = await this.patientRepository.findById(
          input.patientId,
          professionalId,
        );

        if (!patient) {
          return Result.fail('Patient not found');
        }

        appointment.patientId = patient.id;
        appointment.updateTitle(patient.name);
      }

      if (input.startAt) {
        appointment.startAt = new Date(input.startAt);
      }

      if (input.endAt) {
        appointment.endAt = new Date(input.endAt);
      }

      if (input.status) {
        appointment.updateStatus(
          input.status as never,
          input.backgroundColor,
          input.textColor,
          input.display,
        );
      } else if (
        input.backgroundColor !== undefined &&
        input.textColor !== undefined &&
        input.display !== undefined
      ) {
        appointment.setVisualProperties(
          input.backgroundColor,
          input.textColor,
          input.display,
        );
      }

      if (input.title) {
        appointment.updateTitle(input.title);
      }

      appointment.updatedAt = new Date();

      await this.appointmentRepository.update(appointment);

      return Result.ok(appointment);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
