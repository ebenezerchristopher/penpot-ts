import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Profile } from '@prisma/client';
import { FileService } from './file.service';
import { GetFileBundleResponse } from './dto/file.response';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Query(() => GetFileBundleResponse)
  @UseGuards(GqlAuthGuard)
  async getFileBundle(
    @Args('fileId') fileId: string,
    @CurrentUser() user: Profile
  ): Promise<GetFileBundleResponse> {
    return this.fileService.getFileBundle(fileId, user.id);
  }
}
