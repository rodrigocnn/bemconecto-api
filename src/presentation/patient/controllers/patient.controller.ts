import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

import { Result } from '@/application/shared/result';
import { CreatePatientUseCase } from '@/application/patient/use-cases/create-patient.use-case';
import { DeletePatientUseCase } from '@/application/patient/use-cases/delete-patient.use-case';
import { FindAllPatientsUseCase } from '@/application/patient/use-cases/find-all-patients.use-case';
import { UpdatePatientUseCase } from '@/application/patient/use-cases/update-patient.use-case';
import { CreatePatientDto } from '@/presentation/patient/dtos/create-patient.dto';
import { UpdatePatientDto } from '@/presentation/patient/dtos/update-patient.dto';
import { PatientMapper } from '@/presentation/patient/mappers/patient.mapper';
import { getErrorMessage } from '@/presentation/shared/get-error-message';
import { AuthenticatedRequest } from '@/infra/auth/authenticated-request';

@Controller('patients')
export class PatientController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly findAllPatientsUseCase: FindAllPatientsUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
    private readonly deletePatientUseCase: DeletePatientUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreatePatientDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof PatientMapper.toHttp>>> {
    const result = await this.createPatientUseCase.execute({
      ...body,
      professionalId: request.user.professionalId,
    });

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: PatientMapper.toHttp(result.data),
    };
  }

  @Get()
  async findAll(
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof PatientMapper.toHttp>[]>> {
    const result = await this.findAllPatientsUseCase.execute(
      request.user.professionalId,
    );

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: PatientMapper.toHttpMany(result.data),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdatePatientDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof PatientMapper.toHttp>>> {
    const result = await this.updatePatientUseCase.execute(
      id,
      body,
      request.user.professionalId,
    );

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: PatientMapper.toHttp(result.data),
    };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<boolean>> {
    const result = await this.deletePatientUseCase.execute(
      id,
      request.user.professionalId,
    );

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return result;
  }
}
