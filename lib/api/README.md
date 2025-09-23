# `/lib/api`
Here, you can create **feature-wise** folders for server-actions in `actions.ts`, tanstack-queries in `queries.ts` and mock-data in `mock-data.ts`.

## Authenticated Requests **
You can use `getAuthenticatedAxios()` from `@/lib/axios` to handle authenticated requests. This handles both cases for server and client side authentications.