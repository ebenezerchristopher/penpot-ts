import { useState } from 'react';
import { Switch, Route, Redirect } from 'wouter';
import { useAuthStore } from './features/auth/use-auth.store';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';

// Placeholder for the main dashboard component
const Dashboard = () => {
  const { user, logout } = useAuthStore();
  return (
    <div>
      <h1>Welcome, {user?.fullname}!</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

function App() {
  const { accessToken, user } = useAuthStore();
  const isAuthenticated = !!accessToken && !!user;

  // On initial load, if we have a token, fetch the user profile
  const { fetchProfile } = useAuthStore();
  useState(() => {
    if (accessToken && !user) {
      fetchProfile();
    }
  });

  return (
    <Switch>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route path="/register">
        {isAuthenticated ? <Redirect to="/" /> : <RegisterPage />}
      </Route>

      {/* Default Route / Protected Route */}
      <Route path="/">
        {isAuthenticated ? <Dashboard /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
