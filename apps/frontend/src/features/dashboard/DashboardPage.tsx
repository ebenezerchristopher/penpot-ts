// apps/frontend/src/features/dashboard/DashboardPage.tsx

import React from 'react';
import styles from './Dashboard.module.css';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { useAuthStore } from '../auth/use-auth.store';

export const DashboardPage: React.FC = () => {
  // On initial load, if we have a token but no user object, fetch it.
  const { accessToken, user, fetchProfile } = useAuthStore();
  React.useEffect(() => {
    if (accessToken && !user) {
      fetchProfile();
    }
  }, [accessToken, user, fetchProfile]);

  if (!user) {
    // Show a loading indicator while the user profile is being fetched.
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <MainContent />
    </div>
  );
};
