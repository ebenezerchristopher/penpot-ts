import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}

  async getFileBundle(fileId: string, profileId: string) {
    // First, check if the user has permission to view this file.
    // This is a simplified permission check. A real one would be more complex.
    const file = await this.prisma.file.findFirst({
      where: {
        id: fileId,
        project: {
          team: {
            members: {
              some: {
                profile_id: profileId,
              },
            },
          },
        },
      },
    });

    if (!file) {
      throw new NotFoundException(
        `File with ID "${fileId}" not found or you do not have access.`
      );
    }

    return { file };
  }
}
