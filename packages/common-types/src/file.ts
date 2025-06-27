// packages/common-types/src/file.ts

import { z } from 'zod';
import { UuidSchema } from './base';
import { PageSchema } from './page';
import { ComponentSchema } from './component';
import {} from './shapes'; // For colors
import { TokensLibSchema } from './token'; // <-- NEW IMPORT

// --- Top-level container for a Penpot file ---

export const FileDataSchema = z.object({
  pages: z.array(UuidSchema),
  pagesIndex: z.record(UuidSchema, PageSchema),
  colors: z
    .record(
      UuidSchema,
      z.object({
        /* Define color asset schema here */
      })
    )
    .optional(),
  components: z.record(UuidSchema, ComponentSchema).optional(),
  typographies: z
    .record(
      UuidSchema,
      z.object({
        /* Define typography asset schema */
      })
    )
    .optional(),
  // ... other assets like tokens will be added here
  tokensLib: TokensLibSchema.optional(), // <-- ADD TOKENS LIBRARY
});
export type FileData = z.infer<typeof FileDataSchema>;

export const FileSchema = z.object({
  id: UuidSchema,
  name: z.string(),
  projectId: UuidSchema.optional(),
  revn: z.number().optional(),
  vern: z.number().optional(),
  createdAt: z.date().optional(),
  modifiedAt: z.date().optional(),
  isShared: z.boolean().optional(),
  version: z.number(),
  features: z.array(z.string()),
  data: FileDataSchema,
});
export type File = z.infer<typeof FileSchema>;
