// apps/frontend/src/features/workspace/useWorkspaceStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { gql } from 'graphql-request';
import type { WorkspaceState, FileBundle } from './workspace.types';
import type { Page } from '@penpot/common-types';
import { authedApiClient } from '../../lib/api-client';

// A helper to process the file data into a more usable map structure
function processFileBundle(bundle: FileBundle): Partial<WorkspaceState> {
  const pagesMap = new Map<string, Page>();
  if (bundle.file.data.pagesIndex) {
    for (const pageId in bundle.file.data.pagesIndex) {
      pagesMap.set(pageId, bundle.file.data.pagesIndex[pageId]);
    }
  }

  const initialPageId = bundle.file.data.pages[0] || null;
  const initialObjects = initialPageId
    ? pagesMap.get(initialPageId)?.objects || {}
    : {};
  const objectsMap = new Map(Object.entries(initialObjects));

  return {
    fileData: bundle.file,
    pages: pagesMap,
    currentPageId: initialPageId,
    objects: objectsMap,
    status: 'ready',
  };
}

export const useWorkspaceStore = create<WorkspaceState>()(
  devtools(
    (set) => ({
      status: 'idle',
      error: null,
      fileData: null,
      pages: new Map(),
      currentPageId: null,
      objects: new Map(),
      selectedShapeIds: new Set(),

      fetchFileBundle: async (fileId: string) => {
        set({ status: 'loading', error: null });
        try {
          const query = gql`
            query GetFileBundle($fileId: String!) {
              getFileBundle(fileId: $fileId) {
                file {
                  id
                  name
                  data
                }
              }
            }
          `;

          const { getFileBundle } = await authedApiClient<{
            getFileBundle: FileBundle;
          }>(query, { fileId });

          set(processFileBundle(getFileBundle));
        } catch (error: unknown) {
          // ... error handling ...
          set({ status: 'error', error: `${error}` });
        }
      },

      setCurrentPage: (pageId: string) => {
        set((state) => {
          const newPage = state.pages.get(pageId);
          if (!newPage) return {};
          const newObjects = new Map(Object.entries(newPage.objects));
          return {
            currentPageId: pageId,
            objects: newObjects,
            selectedShapeIds: new Set(), // Clear selection on page change
          };
        });
      },
    }),
    { name: 'penpot-workspace-storage' }
  )
);
