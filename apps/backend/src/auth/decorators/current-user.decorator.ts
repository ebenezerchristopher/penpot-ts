import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Profile } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): Profile => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);
