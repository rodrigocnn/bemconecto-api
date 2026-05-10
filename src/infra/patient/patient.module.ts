import { Module } from '@nestjs/common';

import { PATIENT_REPOSITORY } from '@/application/patient/repositories/patient.repository';
import { CreatePatientUseCase } from '@/application/patient/use-cases/create-patient.use-case';
import { DeletePatientUseCase } from '@/application/patient/use-cases/delete-patient.use-case';
import { FindAllPatientsUseCase } from '@/application/patient/use-cases/find-all-patients.use-case';
import { UpdatePatientUseCase } from '@/application/patient/use-cases/update-patient.use-case';
import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { PatientController } from '@/presentation/patient/controllers/patient.controller';

import { PrismaPatientRepository } from './repositories/prisma-patient.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PatientController],
  providers: [
    PrismaPatientRepository,
    {
      provide: PATIENT_REPOSITORY,
      useExisting: PrismaPatientRepository,
    },
    {
      provide: CreatePatientUseCase,
      useFactory: (patientRepository: PrismaPatientRepository) =>
        new CreatePatientUseCase(patientRepository),
      inject: [PATIENT_REPOSITORY],
    },
    {
      provide: FindAllPatientsUseCase,
      useFactory: (patientRepository: PrismaPatientRepository) =>
        new FindAllPatientsUseCase(patientRepository),
      inject: [PATIENT_REPOSITORY],
    },
    {
      provide: UpdatePatientUseCase,
      useFactory: (patientRepository: PrismaPatientRepository) =>
        new UpdatePatientUseCase(patientRepository),
      inject: [PATIENT_REPOSITORY],
    },
    {
      provide: DeletePatientUseCase,
      useFactory: (patientRepository: PrismaPatientRepository) =>
        new DeletePatientUseCase(patientRepository),
      inject: [PATIENT_REPOSITORY],
    },
  ],
})
export class PatientModule {}
