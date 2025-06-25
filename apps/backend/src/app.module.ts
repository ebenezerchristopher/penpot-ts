// apps/backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver'; // <-- IMPORT THE RESOLVER

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
    }),
  ],
  providers: [AppResolver], // <-- REGISTER AppResolver AS A PROVIDER
  // controllers: [AppController], // <-- REMOVE THE CONTROLLER
})
export class AppModule {}
