import { Switch, Route, Redirect } from 'wouter';
import { useAuthStore } from './features/auth/use-auth.store';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { DashboardPage } from './features/dashboard/DashboardPage'; // <-- NEW IMPORT

function App() {
  const { accessToken } = useAuthStore();
  const isAuthenticated = !!accessToken;

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
        {isAuthenticated ? <DashboardPage /> : <Redirect to="/login" />}
      </Route>

      {/* Fallback for unknown routes */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
