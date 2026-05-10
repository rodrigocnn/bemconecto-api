import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from '@/infra/session/session.module';
import { UserModule } from '@/infra/user/user.module';
import { ProfessionalModule } from '@/infra/professional/professional.module';
import { PatientModule } from '@/infra/patient/patient.module';
import { AppointmentModule } from '@/infra/appointment/repositories/appointment.module';
import { AuthModule } from '@/infra/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SessionModule,
    ProfessionalModule,
    PatientModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
