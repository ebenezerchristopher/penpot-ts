import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response'; // <-- IMPORT RESPONSE DTO
import { RegisterInput } from './dto/register.input'; // <-- NEW

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
}
