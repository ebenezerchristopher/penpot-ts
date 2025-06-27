// packages/common-types/src/page.ts

import { z } from 'zod';
import { UuidSchema } from './base';
import { ShapeSchema } from './shapes';

// Recursive schemas need to be wrapped in z.lazy()
const lazyShapeSchema = z.lazy(() => ShapeSchema);

export const GuideSchema = z.object({
  id: UuidSchema,
  axis: z.enum(['x', 'y']),
  position: z.number(),
  frameId: UuidSchema.optional().nullable(),
});
export type Guide = z.infer<typeof GuideSchema>;

export const FlowSchema = z.object({
  id: UuidSchema,
  name: z.string(),
  startingFrameId: UuidSchema, // Corrected from starting-frame
});
export type Flow = z.infer<typeof FlowSchema>;

export const PageSchema = z.object({
  id: UuidSchema,
  name: z.string(),
  index: z.number().optional(),
  objects: z.record(UuidSchema, lazyShapeSchema), // A map of UUIDs to Shapes
  guides: z.record(UuidSchema, GuideSchema).optional(),
  flows: z.record(UuidSchema, FlowSchema).optional(),
  // ... other page-specific properties like background can be added here
});
export type Page = z.infer<typeof PageSchema>;
