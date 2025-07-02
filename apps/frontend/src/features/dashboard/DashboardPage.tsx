// apps/frontend/src/features/dashboard/DashboardPage.tsx

import React from 'react';
import styles from './Dashboard.module.css';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { useAuthStore } from '../auth/use-auth.store';

export const DashboardPage: React.FC = () => {
  const { user, fetchProfile, dashboardData, fetchDashboardData } =
    useAuthStore();

  React.useEffect(() => {
    // Fetch profile if needed, then fetch dashboard data
    if (!user) {
      fetchProfile().then(() => fetchDashboardData());
    } else if (!dashboardData) {
      fetchDashboardData();
    }
  }, [user, fetchProfile, dashboardData, fetchDashboardData]);

  if (!user || !dashboardData) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <MainContent />
    </div>
  );
};
