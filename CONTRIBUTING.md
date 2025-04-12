# Contribution Guide

Welcome to Backdoor 🎉. This guide will help you get started with the project.

- **Next.js** - frontend framework of choice.
- **Tailwind + Shadcn** - styling choice and default component library.
- **Tanstack Query + Server Actions** - for interaction with backend.
- **yarn** - package manager of choice.
- **husky** - pre commit hooks.

## Setting Up Locally
1. Clone the repo.
2. Setup environment variables and dependencies.
    ``` 
    mv sample.env .env
    yarn 
    yarn dev 
    ```
3. The frontend is live on http://localhost:3000.

## Directory Structure
Next follows directory based routing, so all the pages go in `/app`, the corresponding feature-wise components go in `/components` and all the types and the business logic goes in `/lib`.

For the `/components` folder - 
```
/components
│
├── /ui
│   └── Common and reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       └── ... (other base components + shadcn)
│
├── /providers
│   └── Application-level context providers
│       ├── query-client-provider.tsx
│       ├── theme-provider.tsx
│       └── ... (additional providers)
│
├── /<feature>
│   └── Feature-specific components
│       ├── /skeletons
│       │   └── <feature>-skeleton.tsx
│       ├── <component-1>.tsx
│       ├── <component-2>.tsx
│       └── index.ts        <-- Export relevant components for cleaner imports
```

For the `/lib` folder - 
```
/lib
│
├── /data
│   └── Centralized data fetching logic
│   ├── /<feature>
│   │   ├── actions.ts        <-- Server Actions (server-only functions)
│   │   ├── queries.ts        <-- TanStack Query fetchers, mutations, and client-safe logic
│   │   └── mock-data.ts      <-- (optional) Mock data for component testing or previews
│
├── /hooks
│   └── Custom reusable React hooks
│       ├── use-challenge-params.ts
│       └── ... (feature or utility-based hooks)
|
├── /types
│   └── Application-wide type definitions
│       ├── auth.ts
│       ├── challenge.ts
│       └── ... (feature-specific types)
│       └── index.ts         <-- Exports all the types (for cleaner and modular imports)
│
├── constants.ts              <-- Centralized environment constants (env-based)
├── utils.ts                  <-- Shared utility/helper functions
```

## Guidelines
### Naming Conventions
You can follow this [guide](https://www.sufle.io/blog/naming-conventions-in-react) for typical react conventions for a scalable project.

### Component Composition Patterns
- If something doesn't require user interaction - make it a server component and make sure to wrap it in a `<Suspense />` and `<ErrorBoundary />`.
- You can checkout this [guide](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) for server and client composition patterns.
- Also, if using client components within a server component (which is most of the use cases) - you can take advantage of [server side prefetching]() in tanstack.
- This is quite good method as we can take advantage of streaming as well as prefetching the data for our client components using tanstack. Here's a [video](https://www.youtube.com/watch?v=XcUpTPbY4Wg) to wrap your head around it.

