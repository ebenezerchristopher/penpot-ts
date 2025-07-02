import React from 'react';
import styles from './Dashboard.module.css'; // <-- CSS Module is already imported
import { useAuthStore } from '../auth/use-auth.store';
import { Button } from '@penpot/ui-core';

interface ListItemProps {
  children: React.ReactNode;
  indent?: boolean;
}

// This component now uses CSS classes for styling.
const ListItem: React.FC<ListItemProps> = ({ children, indent = false }) => {
  // Conditionally combine class names
  const classNames = `${styles.listItem} ${indent ? styles.indented : ''}`;

  return <div className={classNames}>{children}</div>;
};

export const Sidebar: React.FC = () => {
  const { user, logout, dashboardData } = useAuthStore();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2>{user?.fullname}</h2>
        <p>{user?.email}</p>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        {dashboardData?.teams.map((team) => (
          <div key={team.id}>
            <ListItem>
              <strong>{team.name}</strong>
            </ListItem>
            {team.projects.map((project) => (
              <ListItem key={project.id} indent={true}>
                {' '}
                {/* Pass the indent prop */}
                {project.name}
              </ListItem>
            ))}
          </div>
        ))}
      </div>
      <Button onClick={logout} variant="secondary">
        Log Out
      </Button>
    </aside>
  );
};
