import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // This command ensures that we can connect to the database.
    await this.$connect();
    console.log('📦 Prisma client connected to the database.');
  }
}
