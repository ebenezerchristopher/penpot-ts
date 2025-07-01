import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  fullname!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}
