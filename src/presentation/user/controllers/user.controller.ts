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
import {
  CreateUserUseCase,
  CreateUserUseCaseInput,
} from '@/application/user/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '@/application/user/use-cases/delete-user.use-case';
import { FindAllUsersUseCase } from '@/application/user/use-cases/find-all-users.use-case';
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput,
} from '@/application/user/use-cases/update-user.use-case';
import { CreateUserDto } from '@/presentation/user/dtos/create-user.dto';
import { UpdateUserDto } from '@/presentation/user/dtos/update-user.dto';
import { UserMapper } from '@/presentation/user/mappers/user.mapper';
import { getErrorMessage } from '@/presentation/shared/get-error-message';
import { AuthenticatedRequest } from '@/infra/auth/authenticated-request';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(
    @Body() body: CreateUserDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof UserMapper.toHttp>>> {
    const input: CreateUserUseCaseInput = {
      ...body,
      professionalId: request.user.professionalId,
    };

    const result = await this.createUserUseCase.execute(input);

    if (!result.success) {
      return {
        success: false,
        error: getErrorMessage(result.error),
      };
    }

    return {
      success: true,
      data: UserMapper.toHttp(result.data),
    };
  }

  @Get()
  async findAll(
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof UserMapper.toHttpMany>>> {
    const result = await this.findAllUsersUseCase.execute(
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
      data: UserMapper.toHttpMany(result.data),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof UserMapper.toHttp>>> {
    const input: UpdateUserUseCaseInput = {
      id,
      ...body,
    };

    const result = await this.updateUserUseCase.execute(
      input,
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
      data: UserMapper.toHttp(result.data),
    };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<Result<ReturnType<typeof UserMapper.toHttp>>> {
    const result = await this.deleteUserUseCase.execute(
      id,
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
      data: UserMapper.toHttp(result.data),
    };
  }
}
