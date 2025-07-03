// apps/frontend/src/features/workspace/useWorkspaceStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
//import { gql } from 'graphql-request';
//import { authedApiClient } from '../../lib/api-client';
import type { WorkspaceState, FileBundle } from './workspace.types';
import type { Page } from '@penpot/common-types';

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
          // This query will be created in the next ticket (PHX-30)
          /**
          * 
          *  const query = gql`
            query GetFileBundle($fileId: String!) {
              getFileBundle(fileId: $fileId) {
                file {
                  id
                  name
                  data {
                    pages
                    pagesIndex
                  }
                }
              }
            }
          `;
          */

          // For now, we will mock the response.
          // const { getFileBundle } = await apiClient.request<{ getFileBundle: FileBundle }>(query, { fileId });

          // --- MOCKED DATA ---
          const mockPageId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
          const mockFileBundle: FileBundle = {
            file: {
              id: fileId,
              name: 'My Awesome File',
              version: 1,
              features: [],
              data: {
                pages: [mockPageId],
                pagesIndex: {
                  [mockPageId]: {
                    id: mockPageId,
                    name: 'Page 1',
                    objects: {}, // Initially empty
                  },
                },
              },
            },
          };
          // --- END MOCKED DATA ---

          set(processFileBundle(mockFileBundle));
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
