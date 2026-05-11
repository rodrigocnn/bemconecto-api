import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

import { AuthenticatedRequest } from '@/infra/auth/authenticated-request';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

type JwtPayload = {
  sub?: string;
  email?: string;
  role?: string;
};

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async use(
    request: AuthenticatedRequest,
    _response: Response,
    next: NextFunction,
  ): Promise<void> {
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const token = authorization.slice('Bearer '.length).trim();

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!payload.sub || !payload.email || !payload.role) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const user = await this.prisma.client.user.findFirst({
        where: {
          id: payload.sub,
          deletedAt: null,
        },
      });

      if (!user?.professionalId) {
        throw new UnauthorizedException('User not found for token');
      }

      request.user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        professionalId: user.professionalId,
      };

      next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
