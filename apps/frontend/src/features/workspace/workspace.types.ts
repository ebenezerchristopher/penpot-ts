// apps/frontend/src/features/workspace/workspace.types.ts

import type { File as CommonFile, Page, Shape } from '@penpot/common-types';

export type FileBundle = {
  file: CommonFile;
};

export interface WorkspaceState {
  status: 'idle' | 'loading' | 'ready' | 'error';
  error: string | null;

  fileData: CommonFile | null;
  pages: Map<string, Page>;
  currentPageId: string | null;

  // A map of all shape objects on the current page, keyed by their ID
  objects: Map<string, Shape>;

  selectedShapeIds: Set<string>;

  // Actions
  fetchFileBundle: (fileId: string) => Promise<void>;
  setCurrentPage: (pageId: string) => void;
}
