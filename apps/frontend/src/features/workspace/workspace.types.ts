// apps/frontend/src/features/workspace/workspace.types.ts

import type { File, Page, Shape } from '@penpot/common-types';

// The full data bundle required to initialize the workspace
export type FileBundle = {
  file: File;
  // In the future, this will also include libraries, comments, etc.
};

export interface WorkspaceState {
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;

  fileData: File | null;
  pages: Map<string, Page>;
  currentPageId: string | null;

  // A map of all shape objects on the current page, keyed by their ID
  objects: Map<string, Shape>;

  selectedShapeIds: Set<string>;

  // Actions
  fetchFileBundle: (fileId: string) => Promise<void>;
  setCurrentPage: (pageId: string) => void;
}
