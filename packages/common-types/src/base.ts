// packages/common-types/src/base.ts

import { z } from 'zod';

// A reusable schema for UUIDs, which are strings.
export const UuidSchema = z.string().uuid();
export type Uuid = z.infer<typeof UuidSchema>;

// A schema for a 2D point, reflecting the Clojure records.
export const PointSchema = z.object({
  x: z.number(),
  y: z.number(),
});
export type Point = z.infer<typeof PointSchema>;

// A schema for a rectangle, defined by two points.
export const RectSchema = z.object({
  x1: z.number(),
  y1: z.number(),
  x2: z.number(),
  y2: z.number(),
});
export type Rect = z.infer<typeof RectSchema>;

// A 4x4 transformation matrix
export const MatrixSchema = z.tuple([
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
]);
export type Matrix = z.infer<typeof MatrixSchema>;
