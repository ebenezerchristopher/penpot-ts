// apps/backend/src/app.resolver.ts

import { Query, Resolver, Args } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  hello(): string {
    return 'Penpot Phoenix Backend is running!';
  }

  @Query(() => String, { name: 'health' })
  healthCheck(
    @Args('echo', { type: () => String, nullable: true }) echo?: string
  ): string {
    return `OK: ${echo || 'pong'}`;
  }
}
