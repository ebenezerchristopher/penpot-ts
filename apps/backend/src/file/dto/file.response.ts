import { ObjectType, Field, ID } from '@nestjs/graphql';
import { JSONResolver } from 'graphql-scalars';
import { File as PrismaFile } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

@ObjectType()
export class FileBundle implements Partial<PrismaFile> {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => JSONResolver, {
    description:
      'The raw JSONB data of the file, containing pages, shapes, etc.',
  })
  data!: JsonValue; // Prisma returns JSONB as 'any', graphql-scalars handles it
}

@ObjectType()
export class GetFileBundleResponse {
  @Field(() => FileBundle)
  file!: FileBundle;
}
