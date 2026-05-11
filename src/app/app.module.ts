import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SessionModule } from '@/infra/session/session.module';
import { UserModule } from '@/infra/user/user.module';
import { ProfessionalModule } from '@/infra/professional/professional.module';
import { PatientModule } from '@/infra/patient/patient.module';
import { AppointmentModule } from '@/infra/appointment/repositories/appointment.module';
import { AuthModule } from '@/infra/auth/auth.module';
import { AuthMiddleware } from '@/infra/auth/auth.middleware';
import { AppointmentController } from '@/presentation/appointment/controllers/appointment.controller';
import { PatientController } from '@/presentation/patient/controllers/patient.controller';
import { ProfessionalController } from '@/presentation/professional/controllers/professional.controller';
import { SessionController } from '@/presentation/session/controllers/session.controller';
import { UserController } from '@/presentation/user/controllers/user.controller';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes(
      UserController,
      SessionController,
      ProfessionalController,
      PatientController,
      AppointmentController,
    );
  }
}
