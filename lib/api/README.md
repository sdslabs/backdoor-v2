# `/lib/api`
Here, you can create **feature-wise** folders for server-actions in `actions.ts`, tanstack-queries in `queries.ts` and mock-data in `mock-data.ts`.

## Authenticated Requests **
To make authenticated requests - there are 2 exported functions in `/axios` folder - 
- `createClientAxios()` - Creating authenticated axiosInstance for tanstack queries and mutations.
- `async createServerAxios()` - reating authenticated axiosInstance for server actions.