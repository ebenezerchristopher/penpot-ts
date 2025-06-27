// packages/common-types/src/shapes.ts

import { z } from 'zod';
import { UuidSchema, PointSchema, RectSchema, MatrixSchema } from './base';
import { PathContentSchema } from './path';
import { AppliedTokensSchema } from './token'; // <-- NEW IMPORT
import { VariantShapeInfoSchema, VariantContainerInfoSchema } from './variant'; // <-- NEW IMPORT

// --- Enums and Literal Types ---

export const ShapeTypeSchema = z.enum([
  'frame',
  'group',
  'bool',
  'rect',
  'path',
  'text',
  'circle',
  'svg-raw',
  'image',
]);
export type ShapeType = z.infer<typeof ShapeTypeSchema>;

export const BlendModeSchema = z.enum([
  'normal',
  'darken',
  'multiply',
  'color-burn',
  'lighten',
  'screen',
  'color-dodge',
  'overlay',
  'soft-light',
  'hard-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
]);
export type BlendMode = z.infer<typeof BlendModeSchema>;

// --- Fill and Stroke Schemas ---

export const HexColorSchema = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Invalid hex color format');
export type HexColor = z.infer<typeof HexColorSchema>;

export const GradientStopSchema = z.object({
  color: HexColorSchema,
  opacity: z.number().min(0).max(1).optional(),
  offset: z.number().min(0).max(1),
});
export type GradientStop = z.infer<typeof GradientStopSchema>;

export const GradientSchema = z.object({
  type: z.enum(['linear', 'radial']),
  startX: z.number(),
  startY: z.number(),
  endX: z.number(),
  endY: z.number(),
  width: z.number(),
  stops: z.array(GradientStopSchema),
});
export type Gradient = z.infer<typeof GradientSchema>;

export const ImageSchema = z.object({
  id: UuidSchema,
  width: z.number(),
  height: z.number(),
  mtype: z.string(),
  name: z.string().optional(),
  keepAspectRatio: z.boolean().optional(),
});
export type Image = z.infer<typeof ImageSchema>;

// Internal base object schemas for refinement
const FillObjectSchema = z.object({
  fillColor: HexColorSchema.optional(),
  fillColorGradient: GradientSchema.optional(),
  fillImage: ImageSchema.optional(),
});
type FillObject = z.infer<typeof FillObjectSchema>;

const StrokeObjectSchema = z.object({
  strokeColor: HexColorSchema.optional(),
  strokeColorGradient: GradientSchema.optional(),
  strokeImage: ImageSchema.optional(),
});
type StrokeObject = z.infer<typeof StrokeObjectSchema>;

// The final, exported schemas for Fill and Stroke
export const FillSchema = FillObjectSchema.extend({
  fillOpacity: z.number().min(0).max(1).optional(),
  fillColorRefId: UuidSchema.optional(),
  fillColorRefFile: UuidSchema.optional(),
}).refine(
  (data: FillObject) =>
    [data.fillColor, data.fillColorGradient, data.fillImage].filter(Boolean)
      .length === 1,
  { message: 'A fill must be one of: solid color, gradient, or image.' }
);
export type Fill = z.infer<typeof FillSchema>;

export const StrokeSchema = StrokeObjectSchema.extend({
  strokeColorRefId: UuidSchema.optional(),
  strokeColorRefFile: UuidSchema.optional(),
  strokeOpacity: z.number().min(0).max(1).optional(),
  strokeStyle: z.enum(['solid', 'dotted', 'dashed', 'mixed']).optional(),
  strokeWidth: z.number().optional(),
  strokeAlignment: z.enum(['center', 'inner', 'outer']).optional(),
  strokeCapStart: z
    .enum([
      'line-arrow',
      'triangle-arrow',
      'square-marker',
      'circle-marker',
      'diamond-marker',
      'round',
      'square',
    ])
    .nullable()
    .optional(),
  strokeCapEnd: z
    .enum([
      'line-arrow',
      'triangle-arrow',
      'square-marker',
      'circle-marker',
      'diamond-marker',
      'round',
      'square',
    ])
    .nullable()
    .optional(),
}).refine(
  (data: StrokeObject) =>
    [data.strokeColor, data.strokeColorGradient, data.strokeImage].filter(
      Boolean
    ).length === 1,
  { message: 'A stroke must be one of: solid color, gradient, or image.' }
);
export type Stroke = z.infer<typeof StrokeSchema>;

// --- Effect Schemas ---

export const ShadowSchema = z.object({
  id: UuidSchema.optional(),
  style: z.enum(['drop-shadow', 'inner-shadow']),
  offsetX: z.number(),
  offsetY: z.number(),
  blur: z.number(),
  spread: z.number(),
  hidden: z.boolean(),
  color: FillSchema,
});
export type Shadow = z.infer<typeof ShadowSchema>;

export const BlurSchema = z.object({
  id: UuidSchema,
  type: z.literal('layer-blur'),
  value: z.number(),
  hidden: z.boolean(),
});
export type Blur = z.infer<typeof BlurSchema>;

// --- Core Shape Schema ---

export const ShapeSchema = z
  .object({
    id: UuidSchema,
    name: z.string(),
    type: ShapeTypeSchema,

    // Geometric properties
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
    rotation: z.number().default(0),
    selrect: RectSchema,
    points: z.array(PointSchema).length(4),
    transform: MatrixSchema,
    transformInverse: MatrixSchema,

    // Tree structure
    parentId: UuidSchema,
    frameId: UuidSchema,

    // Optional styling and state attributes
    hidden: z.boolean().optional(),
    locked: z.boolean().optional(),
    collapsed: z.boolean().optional(),
    opacity: z.number().optional(),
    blendMode: BlendModeSchema.optional(),

    fills: z.array(FillSchema).optional(),
    strokes: z.array(StrokeSchema).optional(),
    shadow: z.array(ShadowSchema).optional(),
    blur: BlurSchema.optional(),

    // Corner radius
    r1: z.number().optional(),
    r2: z.number().optional(),
    r3: z.number().optional(),
    r4: z.number().optional(),

    // For bool operations
    boolType: z
      .enum(['union', 'difference', 'exclude', 'intersection'])
      .optional(),

    // For path and bool types
    content: PathContentSchema.optional(),
    appliedTokens: AppliedTokensSchema.optional(), // <-- ADD APPLIED TOKENS
  })
  .merge(VariantShapeInfoSchema) // <-- MERGE IN VARIANT SHAPE INFO
  .merge(VariantContainerInfoSchema); // <-- MERGE IN VARIANT CONTAINER INFO;
export type Shape = z.infer<typeof ShapeSchema>;
