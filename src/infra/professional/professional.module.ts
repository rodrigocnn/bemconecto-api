import { Module } from '@nestjs/common';
import { PROFESSIONAL_REPOSITORY } from '@/application/professional/repositories/professional.repository';
import { CreateProfessionalUseCase } from '@/application/professional/use-cases/create-professional.use-case';
import { FindAllProfessionalsUseCase } from '@/application/professional/use-cases/find-all-professionals.use-case';
import { UpdateProfessionalUseCase } from '@/application/professional/use-cases/update-professional.use-case';
import { DeleteProfessionalUseCase } from '@/application/professional/use-cases/delete-professional.use-case';
import { PrismaModule } from '@/infra/database/prisma/prisma.module';
import { ProfessionalController } from '@/presentation/professional/controllers/professional.controller';
import { PrismaProfessionalRepository } from './repositories/prisma-professional.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProfessionalController],
  providers: [
    PrismaProfessionalRepository,
    {
      provide: PROFESSIONAL_REPOSITORY,
      useExisting: PrismaProfessionalRepository,
    },
    {
      provide: CreateProfessionalUseCase,
      useFactory: (professionalRepository: PrismaProfessionalRepository) =>
        new CreateProfessionalUseCase(professionalRepository),
      inject: [PROFESSIONAL_REPOSITORY],
    },
    {
      provide: FindAllProfessionalsUseCase,
      useFactory: (professionalRepository: PrismaProfessionalRepository) =>
        new FindAllProfessionalsUseCase(professionalRepository),
      inject: [PROFESSIONAL_REPOSITORY],
    },
    {
      provide: UpdateProfessionalUseCase,
      useFactory: (professionalRepository: PrismaProfessionalRepository) =>
        new UpdateProfessionalUseCase(professionalRepository),
      inject: [PROFESSIONAL_REPOSITORY],
    },
    {
      provide: DeleteProfessionalUseCase,
      useFactory: (professionalRepository: PrismaProfessionalRepository) =>
        new DeleteProfessionalUseCase(professionalRepository),
      inject: [PROFESSIONAL_REPOSITORY],
    },
  ],
})
export class ProfessionalModule {}
