import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';

import { Result } from '@/application/shared/result';
import { CreateProfessionalUseCase } from '@/application/professional/use-cases/create-professional.use-case';
import { DeleteProfessionalUseCase } from '@/application/professional/use-cases/delete-professional.use-case';
import { FindAllProfessionalsUseCase } from '@/application/professional/use-cases/find-all-professionals.use-case';
import { UpdateProfessionalUseCase } from '@/application/professional/use-cases/update-professional.use-case';
import { CreateProfessionalDto } from '@/presentation/professional/dtos/create-professional.dto';
import { UpdateProfessionalDto } from '@/presentation/professional/dtos/update-professional-dto';
import { ProfessionalMapper } from '@/presentation/professional/mappers/professional.mapper';
import { getErrorMessage } from '@/presentation/shared/get-error-message';
import { AuthenticatedRequest } from '@/infra/auth/authenticated-request';

@Controller('professionals')
export class ProfessionalController {
  constructor(
    private readonly createProfessionalUseCase: CreateProfessionalUseCase,
    private readonly findAllProfessionalsUseCase: FindAllProfessionalsUseCase,
    private readonly updateProfessionalUseCase: UpdateProfessionalUseCase,
    private readonly deleteProfessionalUseCase: DeleteProfessionalUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateProfessionalDto,
  ): Promise<Result<ReturnType<typeof ProfessionalMapper.toHttp>>> {
    const result = await this.createProfessionalUseCase.execute(body);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: ProfessionalMapper.toHttp(result.data),
    };
  }

  @Get()
  async findAll(
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof ProfessionalMapper.toHttp>[]>> {
    const result = await this.findAllProfessionalsUseCase.execute(
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
      data: result.data.map((professional) => ProfessionalMapper.toHttp(professional)),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProfessionalDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof ProfessionalMapper.toHttp>>> {
    const result = await this.updateProfessionalUseCase.execute(
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
      data: ProfessionalMapper.toHttp(result.data),
    };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<boolean>> {
    const result = await this.deleteProfessionalUseCase.execute(
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
