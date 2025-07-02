import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { gql } from 'graphql-request';
// Import our new clients
import { rawApiClient, authedApiClient } from '../../lib/api-client';
import type { ProfileResponse, LoginInput, RegisterInput } from './auth.types';

// A helper function to safely extract an error message.
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // This is a standard Error object.
    return error.message;
  }
  if (typeof error === 'object' && error !== null && 'response' in error) {
    // This is likely a graphql-request error object.
    const gqlError = error as { response?: { errors?: [{ message: string }] } };
    return (
      gqlError.response?.errors?.[0]?.message ||
      'An unknown GraphQL error occurred.'
    );
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred.';
}

interface AuthState {
  accessToken: string | null;
  user: ProfileResponse | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: null,
        user: null,
        status: 'idle',
        error: null,

        login: async (input) => {
          set({ status: 'loading', error: null });
          try {
            const loginMutation = gql`
              mutation Login($loginInput: LoginInput!) {
                login(loginInput: $loginInput) {
                  accessToken
                }
              }
            `;
            // Use the raw client because we don't have a token yet
            const { login } = await rawApiClient.request<{
              login: { accessToken: string };
            }>(loginMutation, { loginInput: input });
            set({ accessToken: login.accessToken, status: 'success' });
            await get().fetchProfile();
          } catch (error) {
            set({ status: 'error', error: getErrorMessage(error) });
          }
        },

        register: async (input) => {
          set({ status: 'loading', error: null });
          try {
            const registerMutation = gql`
              mutation Register($registerInput: RegisterInput!) {
                register(registerInput: $registerInput) {
                  accessToken
                }
              }
            `;
            // Use the raw client here too
            const { register } = await rawApiClient.request<{
              register: { accessToken: string };
            }>(registerMutation, { registerInput: input });
            set({ accessToken: register.accessToken, status: 'success' });
            await get().fetchProfile();
          } catch (error) {
            set({ status: 'error', error: getErrorMessage(error) });
          }
        },

        fetchProfile: async () => {
          const getProfileQuery = gql`
            query GetMyProfile {
              getProfile {
                id
                email
                fullname
                is_active
                is_demo
              }
            }
          `;
          try {
            // Use the authed client for protected queries
            const data = await authedApiClient<{ getProfile: ProfileResponse }>(
              getProfileQuery
            );
            set({ user: data.getProfile });
          } catch (error) {
            console.error(
              'Failed to fetch profile, logging out.',
              getErrorMessage(error)
            );
            get().logout();
          }
        },

        logout: () => {
          set({ accessToken: null, user: null, status: 'idle' });
        },
      }),
      {
        name: 'penpot-auth-storage',
      }
    )
  )
);
