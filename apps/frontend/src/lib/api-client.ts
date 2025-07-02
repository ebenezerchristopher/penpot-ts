import { GraphQLClient, Variables } from 'graphql-request';
import { useAuthStore } from '../features/auth/use-auth.store';

const endpoint = 'http://localhost:3001/graphql';

// This remains the same.
export const rawApiClient = new GraphQLClient(endpoint);

/**
 * A wrapper around the raw client that injects the Authorization header
 * for authenticated requests.
 * @param document The GraphQL document (query or mutation)
 * @param variables The variables for the operation
 * @returns The result of the GraphQL request
 */
export async function authedApiClient<T>(
  document: string,
  variables?: Variables
): Promise<T> {
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    throw new Error(
      'Attempted to make an authenticated API call without a token.'
    );
  }

  // This is the correct way to pass variables and headers together.
  return rawApiClient.request<T>({
    document,
    variables,
    requestHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
