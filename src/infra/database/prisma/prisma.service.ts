import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

const { PrismaClient } = require('@prisma/client');

@Injectable()
export class PrismaService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly prismaClient = new PrismaClient();

  get client() {
    return this.prismaClient;
  }

  async onModuleInit(): Promise<void> {
    await this.prismaClient.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.prismaClient.$disconnect();
  }
}
