import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response'; // <-- IMPORT RESPONSE DTO
import { RegisterInput } from './dto/register.input'; // <-- NEW
import { UseGuards } from '@nestjs/common'; // <-- NEW
import { GqlAuthGuard } from './guards/gql-auth.guard'; // <-- NEW
import { CurrentUser } from './decorators/current-user.decorator'; // <-- NEW (will create next)
import { ProfileResponse } from './dto/profile.response'; // <-- NEW
import { Profile } from '@prisma/client';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse) // This should return a JWT, for now a placeholder
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<LoginResponse> {
    const user = await this.authService.validateUserByPassword(loginInput);

    return this.authService.login(user); // <-- DELEGATE TOKEN CREATION
  }

  @Mutation(() => LoginResponse)
  async register(
    @Args('registerInput') registerInput: RegisterInput
  ): Promise<LoginResponse> {
    const user = await this.authService.register(registerInput);

    // After successful registration, we immediately log the user in
    return this.authService.login(user); // <-- DELEGATE TOKEN CREATION
  }

  @Query(() => ProfileResponse)
  @UseGuards(GqlAuthGuard) // <-- PROTECT THIS QUERY
  getProfile(@CurrentUser() user: Profile): ProfileResponse {
    // The `user` object is attached to the request by our JwtStrategy's validate method.
    // The @CurrentUser decorator simply extracts it for us.
    return user;
  }
}
