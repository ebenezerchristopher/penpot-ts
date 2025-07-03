import React, { useEffect } from 'react';
import { useRoute } from 'wouter';
import { useWorkspaceStore } from './useWorkspaceStore';

// Placeholder for the main canvas component
const Viewport = () => {
  const { currentPageId } = useWorkspaceStore();
  return (
    <div style={{ flex: 1, backgroundColor: '#e0e0e0', padding: '2rem' }}>
      <h2>Viewport</h2>
      <p>Current Page ID: {currentPageId}</p>
      <p>The canvas will be rendered here.</p>
    </div>
  );
};

export const WorkspacePage: React.FC = () => {
  const [, params] = useRoute('/workspace/:fileId');
  const fileId = params?.fileId;

  const { status, error, fetchFileBundle } = useWorkspaceStore();

  useEffect(() => {
    // Only fetch if we have a fileId and the status is idle
    if (fileId && status === 'idle') {
      fetchFileBundle(fileId);
    }
  }, [fileId, status, fetchFileBundle]);

  if (status === 'loading' || status === 'idle') {
    return <div>Loading Workspace...</div>;
  }

  if (status === 'error') {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  // status === 'ready'
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside
        style={{
          width: '240px',
          borderRight: '1px solid #ccc',
          padding: '1rem',
        }}
      >
        <h3>Layers Panel</h3>
      </aside>
      <Viewport />
      <aside
        style={{
          width: '240px',
          borderLeft: '1px solid #ccc',
          padding: '1rem',
        }}
      >
        <h3>Inspector Panel</h3>
      </aside>
    </div>
  );
};
