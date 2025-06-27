// packages/common-types/src/token.ts

import { z } from 'zod';
import { UuidSchema } from './base';

// --- Individual Token Definition ---

export const TokenTypeSchema = z.enum([
  'boolean',
  'border-radius',
  'color',
  'dimensions',
  'font-size',
  'number',
  'opacity',
  'other',
  'rotation',
  'sizing',
  'spacing',
  'string',
  'stroke-width',
]);
export type TokenType = z.infer<typeof TokenTypeSchema>;

export const TokenSchema = z.object({
  id: UuidSchema,
  name: z.string(), // e.g., "colors.primary.500"
  type: TokenTypeSchema,
  value: z.any(), // Value can be a string, number, etc.
  description: z.string().optional(),
  modifiedAt: z.date().optional(),
});
export type Token = z.infer<typeof TokenSchema>;

// --- Token Set ---
// A collection of tokens, often corresponding to a single JSON file.

export const TokenSetSchema = z.object({
  id: UuidSchema,
  name: z.string(), // e.g., "global" or "theme-dark"
  description: z.string().optional(),
  modifiedAt: z.date().optional(),
  tokens: z.record(z.string(), TokenSchema), // Map of token names to tokens
});
export type TokenSet = z.infer<typeof TokenSetSchema>;

// --- Token Theme ---
// A theme defines which token sets are active.

export const TokenThemeSchema = z.object({
  id: UuidSchema,
  name: z.string(),
  group: z.string().optional(),
  description: z.string().optional(),
  isSource: z.boolean().optional(),
  externalId: z.string().optional(),
  modifiedAt: z.date().optional(),
  sets: z.array(z.string()), // Array of token set names
});
export type TokenTheme = z.infer<typeof TokenThemeSchema>;

// --- Tokens Library (within a File) ---
// This is the top-level container for all token-related data in a Penpot file.

export const TokensLibSchema = z.object({
  sets: z.record(z.string(), TokenSetSchema), // Map of set names to sets
  themes: z.record(z.string(), z.record(z.string(), TokenThemeSchema)), // Themes are grouped
  activeThemes: z.array(z.string()),
});
export type TokensLib = z.infer<typeof TokensLibSchema>;

// --- Applied Tokens on a Shape ---
// This schema defines which tokens are applied to a shape's properties.

export const AppliedTokensSchema = z.object({
  // Color tokens
  fill: z.string().optional(),
  strokeColor: z.string().optional(),

  // Sizing and Spacing tokens
  width: z.string().optional(),
  height: z.string().optional(),
  spacingTop: z.string().optional(), // Corresponds to p1/m1
  spacingRight: z.string().optional(), // Corresponds to p2/m2
  spacingBottom: z.string().optional(), // Corresponds to p3/m3
  spacingLeft: z.string().optional(), // Corresponds to p4/m4

  // Other dimension tokens
  strokeWidth: z.string().optional(),
  borderRadiusTopLeft: z.string().optional(), // r1
  borderRadiusTopRight: z.string().optional(), // r2
  borderRadiusBottomRight: z.string().optional(), // r3
  borderRadiusBottomLeft: z.string().optional(), // r4

  // Typography tokens
  fontSize: z.string().optional(),
  lineHeight: z.string().optional(),

  // Other
  opacity: z.string().optional(),
  rotation: z.string().optional(),
});
export type AppliedTokens = z.infer<typeof AppliedTokensSchema>;
