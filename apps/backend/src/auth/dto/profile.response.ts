import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProfileResponse {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  fullname!: string;

  @Field()
  is_active!: boolean;

  @Field()
  is_demo!: boolean;
}
