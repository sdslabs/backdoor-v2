// lib/query-client.ts
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
} from '@tanstack/react-query';

// Create a new QueryClient with consistent configuration
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 60 seconds
        retry: (failureCount, error: any) => {
          // Don't retry on 401/403 errors
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            return false;
          }
          return failureCount < 3;
        },
      },
      dehydrate: {
        // Include pending queries in dehydration for better loading states
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
        shouldRedactErrors: () => {
          // We should not catch Next.js server errors
          // as that's how Next.js detects dynamic pages
          // so we cannot redact them.
          // Next.js also automatically redacts errors for us
          // with better digests.
          return false;
        },
      },
    },
  });
}

// Singleton pattern for client-side QueryClient
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Get a QueryClient instance
 * - Server: Always creates a new instance per request
 * - Client: Maintains a singleton instance
 */
export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

/**
 * Create a fresh QueryClient (useful for testing or isolated contexts)
 */
export function createQueryClient() {
  return makeQueryClient();
}
