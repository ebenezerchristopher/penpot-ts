// packages/common-types/src/path.ts

import { z } from 'zod';

// For now, PathContent is treated as an opaque string that represents the path data.
// A more detailed schema can be built later based on the segment structure if needed.
export const PathContentSchema = z.string();
export type PathContent = z.infer<typeof PathContentSchema>;
