import { Module } from '@nestjs/common';

import { Appointment_REPOSITORY } from '@/application/appointment/repositories/appointment.repository';
import { PATIENT_REPOSITORY } from '@/application/patient/repositories/patient.repository';
import { CreateAppointmentUseCase } from '@/application/appointment/use-cases/create-appointment.use-case';
import { FindAllAppointmentsUseCase } from '@/application/appointment/use-cases/find-all-appointments.use-case';
import { UpdateAppointmentUseCase } from '@/application/appointment/use-cases/update-appointment.use-case';
import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { PrismaPatientRepository } from '@/infra/patient/repositories/prisma-patient.repository';
import { AppointmentController } from '@/presentation/appointment/controllers/appointment.controller';

import { PrismaAppoitmentRepository } from './prisma-appointment.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AppointmentController],
  providers: [
    PrismaAppoitmentRepository,
    PrismaPatientRepository,
    {
      provide: Appointment_REPOSITORY,
      useExisting: PrismaAppoitmentRepository,
    },
    {
      provide: PATIENT_REPOSITORY,
      useExisting: PrismaPatientRepository,
    },
    {
      provide: CreateAppointmentUseCase,
      useFactory: (
        appointmentRepository: PrismaAppoitmentRepository,
        patientRepository: PrismaPatientRepository,
      ) => new CreateAppointmentUseCase(appointmentRepository, patientRepository),
      inject: [Appointment_REPOSITORY, PATIENT_REPOSITORY],
    },
    {
      provide: FindAllAppointmentsUseCase,
      useFactory: (appointmentRepository: PrismaAppoitmentRepository) =>
        new FindAllAppointmentsUseCase(appointmentRepository),
      inject: [Appointment_REPOSITORY],
    },
    {
      provide: UpdateAppointmentUseCase,
      useFactory: (
        appointmentRepository: PrismaAppoitmentRepository,
        patientRepository: PrismaPatientRepository,
      ) => new UpdateAppointmentUseCase(appointmentRepository, patientRepository),
      inject: [Appointment_REPOSITORY, PATIENT_REPOSITORY],
    },
  ],
})
export class AppointmentModule {}
