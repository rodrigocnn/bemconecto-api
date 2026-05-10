import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { CreateAppointmentUseCase } from '@/application/appointment/use-cases/create-appointment.use-case';
import { UpdateAppointmentUseCase } from '@/application/appointment/use-cases/update-appointment.use-case';
import { Result } from '@/application/shared/result';
import { Appointment } from '@/domain/appointment/entities/appointment';
import { CreateAppointmentDto } from '@/presentation/appointment/dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '@/presentation/appointment/dtos/update-appointment.dto';
import { AppointmentMapper } from '@/presentation/appointment/mappers/appointment.mapper';
import { getErrorMessage } from '@/presentation/shared/get-error-message';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateAppointmentDto,
  ): Promise<Result<ReturnType<typeof AppointmentMapper.toHttp>>> {
    const result: Result<Appointment> =
      await this.createAppointmentUseCase.execute(body);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: AppointmentMapper.toHttp(result.data),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateAppointmentDto,
  ): Promise<Result<ReturnType<typeof AppointmentMapper.toHttp>>> {
    const result: Result<Appointment> =
      await this.updateAppointmentUseCase.execute(id, body);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: AppointmentMapper.toHttp(result.data),
    };
  }
}
