import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { Result } from '@/application/shared/result';
import { CreateSessionUseCase } from '@/application/session/use-cases/create-session.use-case';
import { DeleteSessionUseCase } from '@/application/session/use-cases/delete-session.use-case';
import { FindAllSessionsUseCase } from '@/application/session/use-cases/find-all-sessions.use-case';
import {
  UpdateSessionUseCase,
  UpdateSessionUseCaseInput,
} from '@/application/session/use-cases/update-session.use-case';
import { CreateSessionDto } from '@/domain/session/dtos/create-session.dto';
import { SessionMapper } from '@/presentation/session/mappers/session.mapper';
import { Session } from '@/domain/session/entities/session';
import { getErrorMessage } from '@/presentation/shared/get-error-message';
import { UpdateSessionDto } from '@/presentation/session/dtos/update-session.dto';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly findAllSessionsUseCase: FindAllSessionsUseCase,
    private readonly updateSessionUseCase: UpdateSessionUseCase,
    private readonly deleteSessionUseCase: DeleteSessionUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateSessionDto): Promise<Result<Session>> {
    const result = await this.createSessionUseCase.execute(body);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: SessionMapper.toHttp(result.data),
    };
  }

  @Get()
  async findAll(): Promise<Result<ReturnType<typeof SessionMapper.toHttpMany>>> {
    const result = await this.findAllSessionsUseCase.execute();

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: SessionMapper.toHttpMany(result.data),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateSessionDto,
  ): Promise<Result<ReturnType<typeof SessionMapper.toHttp>>> {
    const input: UpdateSessionUseCaseInput = {
      id,
      ...body,
    };

    const result = await this.updateSessionUseCase.execute(input);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: SessionMapper.toHttp(result.data),
    };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<Result<ReturnType<typeof SessionMapper.toHttp>>> {
    const result = await this.deleteSessionUseCase.execute(id);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: SessionMapper.toHttp(result.data),
    };
  }
}
