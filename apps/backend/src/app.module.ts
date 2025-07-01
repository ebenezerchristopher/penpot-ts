// apps/backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver'; // <-- IMPORT THE RESOLVER
import { PrismaModule } from './prisma/prisma.module'; // <-- IMPORT PRISMA
import { AuthModule } from './auth/auth.module'; // <-- IMPORT AUTH

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
    }),
    PrismaModule, // <-- ADD
    AuthModule, // <-- ADD
  ],
  providers: [AppResolver], // <-- REGISTER AppResolver AS A PROVIDER
  // controllers: [AppController], // <-- REMOVE THE CONTROLLER
})
export class AppModule {}
