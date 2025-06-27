// packages/common-types/src/variant.ts

import { z } from 'zod';
import { UuidSchema } from './base';

export const VariantPropertySchema = z.object({
  name: z.string(), // e.g., "State"
  value: z.string(), // e.g., "Hover"
});
export type VariantProperty = z.infer<typeof VariantPropertySchema>;

// This object gets attached to a Component to mark it as part of a variant set.
export const VariantComponentInfoSchema = z.object({
  variantId: UuidSchema.optional(),
  variantProperties: z.array(VariantPropertySchema).optional(),
});
export type VariantComponentInfo = z.infer<typeof VariantComponentInfoSchema>;

// This object gets attached to the root shape of a main component instance.
export const VariantShapeInfoSchema = z.object({
  variantId: UuidSchema.optional(),
  variantName: z.string().optional(),
  variantError: z.string().optional(),
});
export type VariantShapeInfo = z.infer<typeof VariantShapeInfoSchema>;

// This marks a board as a "variant container" in the UI.
export const VariantContainerInfoSchema = z.object({
  isVariantContainer: z.boolean().optional(),
});
export type VariantContainerInfo = z.infer<typeof VariantContainerInfoSchema>;
