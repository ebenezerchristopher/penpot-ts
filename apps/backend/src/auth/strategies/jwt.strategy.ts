// apps/backend/src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

// This is the shape of the decoded JWT payload
export interface JwtPayload {
  email: string;
  sub: string; // 'sub' is the standard claim for subject, which is our user ID
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  // This method is called by Passport after it successfully validates the token's signature and expiration.
  // The return value is what NestJS will attach to the request context as `req.user`.
  async validate(payload: JwtPayload) {
    const user = await this.prisma.profile.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.is_blocked || user.deleted_at) {
      throw new UnauthorizedException('User not found or is disabled.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}
