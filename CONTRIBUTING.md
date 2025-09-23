# Contribution Guide

Welcome to Backdoor 🎉. This guide will help you get started with the project.

- **Next.js** - frontend framework of choice.
- **Tailwind + Shadcn** - styling choice and default component library.
- **Tanstack Query + Server Actions** - for interaction with backend.
- **pnpm** - package manager of choice.
- **husky** - pre commit hooks.

## Setting Up Locally
1. Clone the repo.
2. Setup environment variables and dependencies.
    ``` 
    mv sample.env .env
    pnpm i 
    pnpm dev 
    ```
3. The frontend is live on http://localhost:3000.

## Directory Structure
Next.js follows directory based routing, so all the pages go in `/app`, the corresponding feature-wise components go in `/components` and all the types and the business logic goes in `/lib`.

For the `/app` folder -
```
/app
│
├── /api                           # API routes
│   └── /<feature>                 # Feature-specific API endpoints
│
├── /dashboard                     # Main application pages
│   ├── layout.tsx                 # Dashboard layout
│   ├── /challenge                 # Challenge pages
│   ├── /leaderboard               # Leaderboard page
│   └── /(admin)                   # Admin-only routes (route group)
│       ├── /submissions           # Submissions management
│       └── /users                 # User management
│
├── /profile                       # User profile pages
│   ├── page.tsx                   # Profile redirect
│   └── /[username]                # Dynamic user profiles
│
├── layout.tsx                     # Root layout
├── page.tsx                       # Home page
└── providers.tsx                  # App-level providers
```

For the `/components` folder -
```
/components
│
├── /ui                           # Common and reusable UI components (base + shadcn)
│   ├── button.tsx
│   ├── input.tsx
│   └── ...                       # Other base UI components
│
├── /providers                    # Application-level context providers
│   ├── theme-provider.tsx        # Theme (dark/light mode) provider
│   └── ...                       # Additional global providers
│
├── /table-defs                   # Table column definitions (TanStack Table)
│   ├── <feature>-columns.tsx      # Feature-specific table columns
│   └── ...                       # Other table definitions
│
├── /<feature>                    # Feature-specific component folder
│   ├── /skeletons                # Loading skeletons specific to this feature
│   │   └── <feature>-skeleton.tsx
│   ├── <component-1>.tsx
│   ├── <component-2>.tsx
│   └── index.ts                  # Export relevant components for cleaner and modular imports
```

For the `/lib` folder -
```
/lib
│
├── /api                            # Centralized data fetching logic
│   └── /<feature>
│       ├── actions.ts              # Server Actions (server-only functions)
│       ├── queries.ts              # TanStack Query fetchers, mutations, and client-safe logic
│       └── mock-data.ts            # (optional) Mock data for component testing or previews
│       └── index.ts                # Exports all stuff for modular imports
│
├── /axios                          # Axios instances
│   ├── client-axios.ts             
│   └── server-axios.ts             
│   └── index.ts                    # getAuthenticatedAxios() & getUnauthenticatedAxios()
│
├── /hooks                          # Custom reusable React hooks
│   ├── use-challenge-params.ts
│   └── ...                         # Other feature or utility-based hooks
│
├── /stores                         # Zustand Stores
│   ├── auth-store.ts*              # Stores auth info (role, isLoggedIn and logout())
│   └── ...
│
├── /schemas                        # Zod Schemas
│   ├── auth.ts
│   └── ...
│
├── /types                          # Application-wide type definitions
│   ├── auth.ts
│   ├── challenge.ts
│   ├── ...                         # Other feature-specific types
│   └── index.ts                    # Exports all types for modular imports
│
├── constants.ts                    # Centralized environment constants (env-based)
├── utils.ts                        # Shared utility/helper functions
└── query-client.ts                 # TanStack Query client configuration
```

## Authentication Flow

The application uses a comprehensive authentication system:

- **State Management**: Zustand stores (`useAuthStore`) manage authentication state, user role, and login status
- **Persistence**: `js-cookie` maintains session persistence across page reloads
- **Role-based Access**: Implements `UserRole` types for access control (User, Admin, etc.)
- **HTTP Clients**: Can use `getAuthenticatedAxios()` & `getUnauthenticatedAxios()` as per the use case required. It's independent of client and server side environments.
- **Multi-step Auth**: Supports login, registration with email verification, and password reset flows

## Data Management

### Architecture Pattern
The project follows a clear separation of concerns:

- **Server Actions**: Located in `lib/api/<feature>/<feature>-actions.ts` for mutations and server-side operations
- **TanStack Query**: Client-side data fetching with caching in `lib/api/<feature>/<feature>-queries.ts`
- **Mock Data**: Development-friendly mock data in `lib/api/<feature>/<feature>-mock-data.ts`

### Feature Organization
Each API module exports consistently:
- Actions for mutations
- Query hooks for data fetching
- Mock data for development
- Type-safe interfaces and error handling

## Component Patterns

### Server/Client Composition
- **Server Components by Default**: Use server components for static/dynamic content without interaction
- **Suspense Boundaries**: All data-dependent components wrapped in `<Suspense>` with loading skeletons
- **Client Components**: Only for interactive elements (forms, modals, data manipulation)
- **Server-side Prefetching**: Leverage TanStack Query's prefetching for optimal performance. [More info](#component-composition-patterns)

### Loading States
- **Skeleton Components**: Each feature includes `/skeletons` directory with loading states
- **Streaming**: Progressive UI rendering with Next.js 15 streaming
- **Error Boundaries**: Graceful error handling for failed data fetching

## Key Constants

- **Environment Variables**: API URLs configured in `lib/constants.ts` for development/production
- **Path Aliases**: `@/*` maps to project root for clean imports
- **Pagination**: Table pagination limits defined as constants
- **Route Groups**: Admin routes grouped under `(admin)` for layout sharing

## Guidelines
### Naming Conventions
You can follow this [guide](https://www.sufle.io/blog/naming-conventions-in-react) for typical react conventions for a scalable project.

### Component Composition Patterns
- If something doesn't require user interaction - make it a server component and make sure to wrap it in a `<Suspense />` and `<ErrorBoundary />`.
- You can checkout this [guide](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) for server and client composition patterns.
- Also, if using client components within a server component (which is most of the use cases) - you can take advantage of [server side prefetching](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr) in tanstack.
- This is quite good method as we can take advantage of streaming as well as prefetching the data for our client components using tanstack. Here's a [video](https://www.youtube.com/watch?v=XcUpTPbY4Wg) to wrap your head around it.

