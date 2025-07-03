// This file defines the shapes of data as they are transferred over the API.
import type { FileData, Shape, Component, Page } from './index';

// --- Key-Value Pair for representing maps in GraphQL ---
export interface KVPair<T> {
  key: string;
  value: T;
}

// --- DTOs for the getFile query ---

// The shape object as it appears in the API (simplified)
export interface ShapeObjectDto extends Omit<Shape, 'shapes' | 'objects'> {
  shapes?: string[]; // For groups
  objects?: KVPair<ShapeObjectDto>[]; // For nested components
}

export interface PageObjectDto extends Omit<Page, 'objects'> {
  objects: KVPair<ShapeObjectDto>[];
}

export interface ComponentDto extends Omit<Component, 'objects'> {
  objects?: KVPair<ShapeObjectDto>[];
}

export interface FileDataDto
  extends Omit<FileData, 'pagesIndex' | 'components'> {
  pagesIndex: KVPair<PageObjectDto>[];
  components?: KVPair<ComponentDto>[];
}

export interface FileResponseDto extends Omit<FileData, 'data'> {
  data: FileDataDto;
}
