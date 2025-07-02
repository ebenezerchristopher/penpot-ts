// apps/frontend/src/features/dashboard/MainContent.tsx

import React from 'react';
import styles from './Dashboard.module.css';

export const MainContent: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <h1>Dashboard</h1>
      <p>Content for recent files, projects, etc., will go here.</p>
    </main>
  );
};
