// apps/frontend/src/features/dashboard/Sidebar.tsx

import React from 'react';
import styles from './Dashboard.module.css';
import { useAuthStore } from '../auth/use-auth.store';
import { Button } from '@penpot/ui-core';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>{user?.fullname}&apos;s Teams</h2>
        <p>{user?.email}</p>
      </div>
      <div style={{ flexGrow: 1 }}>
        {/* Placeholder for teams and projects list */}
        <p>Teams and projects will be listed here.</p>
      </div>
      <Button onClick={logout} variant="secondary">
        Log Out
      </Button>
    </aside>
  );
};
