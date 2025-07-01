import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport'; // <-- NEW
import { JwtModule } from '@nestjs/jwt'; // <-- NEW

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use the secret from .env
      signOptions: {
        expiresIn: '7d', // Token expires in 7 days, matching original logic
      },
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
