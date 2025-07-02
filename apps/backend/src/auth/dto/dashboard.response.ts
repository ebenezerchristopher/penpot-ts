import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
class DashboardProject {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;
}

@ObjectType()
class DashboardTeam {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => [DashboardProject])
  projects!: DashboardProject[];
}

@ObjectType()
export class DashboardResponse {
  @Field(() => [DashboardTeam])
  teams!: DashboardTeam[];
}
