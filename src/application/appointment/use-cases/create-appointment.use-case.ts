import { AppointmentRepository } from '@/application/appointment/repositories/appointment.repository';
import { CreateAppointmentMapper } from '@/application/appointment/mappers/create-appointment.mapper';
import { PatientRepository } from '@/application/patient/repositories/patient.repository';
import { Result } from '@/application/shared/result';
import { Appointment } from '@/domain/appointment/entities/appointment';
import { CreateAppointmentDto } from '@/presentation/appointment/dtos/create-appointment.dto';

export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {}

  async execute(input: CreateAppointmentDto): Promise<Result<Appointment>> {
    try {
      const patient = await this.patientRepository.findById(input.patientId);

      if (!patient) {
        return Result.fail('Patient not found');
      }

      const appointment = CreateAppointmentMapper.toDomain(input, patient.name);

      await this.appointmentRepository.create(appointment);

      return Result.ok(appointment);
    } catch (error) {
      return Result.fail(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
