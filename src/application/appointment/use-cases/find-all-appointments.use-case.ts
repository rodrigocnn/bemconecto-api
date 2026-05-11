import { Result } from '@/application/shared/result';
import { Appointment } from '@/domain/appointment/entities/appointment';

import { AppointmentRepository } from '../repositories/appointment.repository';

export class FindAllAppointmentsUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(professionalId: string): Promise<Result<Appointment[]>> {
    try {
      const appointments =
        await this.appointmentRepository.findAll(professionalId);

      return Result.ok(appointments);
    } catch (error) {
      return Result.fail(
        error instanceof Error ? error.message : 'Unexpected error',
      );
    }
  }
}
