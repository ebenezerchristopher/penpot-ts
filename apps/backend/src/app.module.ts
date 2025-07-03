import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

// Import Modules
import { PrismaModule } from './prisma/prisma.module';
// We don't need to import AuthModule and FileModule if we provide their components here

// Import ALL Resolvers
import { AppResolver } from './app.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { FileResolver } from './file/file.resolver';

// Import ALL Services and Strategies
import { AuthService } from './auth/auth.service';
import { FileService } from './file/file.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    PrismaModule, // PrismaService is global, so it's available everywhere
    // Configure JwtModule here to make JwtService available for injection
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  // We explicitly list every provider the application needs.
  // This makes them all visible to the GraphQLModule and each other.
  providers: [
    AppResolver,
    AuthResolver,
    FileResolver,
    AuthService,
    FileService,
    JwtStrategy,
  ],
})
export class AppModule {}
