import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt'; // We'll need to add bcrypt
import { Profile } from '@prisma/client'; // <-- IMPORT PRISMA'S GENERATED TYPE
import { RegisterInput } from './dto/register.input'; // <-- NEW
import { LoginResponse } from './dto/login.response'; // <-- IMPORT RESPONSE DTO
import { JwtService } from '@nestjs/jwt'; // <-- NEW

// Define a utility type that is 'Profile' but omits the 'password' field.
type SanitizedProfile = Omit<Profile, 'password'>;

// This represents the user object attached to the request by the JWT strategy
export type AuthenticatedUser = {
  id: string;
  email: string;
  fullname: string;
  is_active: boolean;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserByPassword(
    loginInput: LoginInput
  ): Promise<SanitizedProfile> {
    const { email, password } = loginInput;

    const user = await this.prisma.profile.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // We will assume passwords are NOT hashed yet, as per original codebase.
    // In a real scenario, we'd use bcrypt.compare(password, user.password)

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (user.is_blocked || user.deleted_at) {
      throw new UnauthorizedException('This account is disabled.');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async register(registerInput: RegisterInput): Promise<SanitizedProfile> {
    const { email, fullname, password } = registerInput;
    const lowercasedEmail = email.toLowerCase();

    const existingUser = await this.prisma.profile.findUnique({
      where: { email: lowercasedEmail },
    });

    if (existingUser) {
      throw new ConflictException('An account with this email already exists.');
    }

    // In a real implementation, we would hash the password here.
    const hashedPassword = await bcrypt.hash(password, 10);

    // This transaction ensures that both the user and their default team are created together.
    const newUser = await this.prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          email: lowercasedEmail,
          fullname,
          password: hashedPassword,
        },
      });

      const defaultTeam = await tx.team.create({
        data: {
          name: 'Default Team',
          is_default: true,
          owner_id: profile.id,
          members: {
            create: {
              profile_id: profile.id,
              role: 'owner',
            },
          },
        },
      });

      // Update the profile with the new default team's ID
      return tx.profile.update({
        where: { id: profile.id },
        data: { default_team_id: defaultTeam.id },
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = newUser;
    return result;
  }

  // NEW METHOD FOR SIGNING TOKENS
  async login(user: AuthenticatedUser): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getDashboardData(profileId: string) {
    const teams = await this.prisma.team.findMany({
      where: {
        members: {
          some: {
            profile_id: profileId,
          },
        },
      },
      include: {
        // Include related projects for each team
        projects: {
          orderBy: {
            name: 'asc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return { teams };
  }
}
