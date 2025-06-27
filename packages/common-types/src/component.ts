// packages/common-types/src/component.ts

import { z } from 'zod';
import { UuidSchema } from './base';
import { ShapeSchema } from './shapes'; // Assuming Shape is defined elsewhere
import { VariantComponentInfoSchema } from './variant';

// Recursive schemas need to be wrapped in z.lazy()
const lazyShapeSchema = z.lazy(() => ShapeSchema);

export const ComponentSchema = z
  .object({
    id: UuidSchema,
    name: z.string(),
    path: z.string().optional().nullable(),
    modifiedAt: z.date().optional(),
    objects: z.record(UuidSchema, lazyShapeSchema).optional(), // A map of UUIDs to Shapes
    mainInstanceId: UuidSchema,
    mainInstancePageId: UuidSchema, // Corrected from main_instance_page
    // 'variant' properties will be added in the next ticket (PHX-14)
  })
  .merge(VariantComponentInfoSchema);
export type Component = z.infer<typeof ComponentSchema>;
