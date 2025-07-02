import React, { useState } from 'react';
import { useAuthStore } from './use-auth.store';
import { Button } from '@penpot/ui-core';

export const LoginPage: React.FC = () => {
  const { login, status, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Logging in...' : 'Log In'}
        </Button>
        {status === 'error' && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};
