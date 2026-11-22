# User Directory

A small React app that lists users from
[JSONPlaceholder](https://jsonplaceholder.typicode.com/users) and lets you
search them by name and filter them by city.

Built with React 19, Vite, TypeScript (strict, no `any`), Tailwind CSS v4,
Vitest and React Testing Library.

## Features

- Table of users: name, email, city, company
- Loading, error (with **Try again**) and **No users found** states
- Case-insensitive search by name
- City dropdown built from the data, with an **All cities** option
- Search and city filter work together

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Script                 | What it does                            |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the dev server                    |
| `npm run build`        | Type-check and build for production     |
| `npm run preview`      | Preview the production build            |
| `npm test`             | Run the tests once                      |
| `npm run test:watch`   | Run the tests in watch mode             |
| `npm run lint`         | Lint with oxlint (`any` is an error)    |
| `npm run typecheck`    | Type-check only                         |
| `npm run format`       | Format with Prettier                    |
| `npm run format:check` | Check formatting without changing files |

## Project structure

Code is grouped by feature. Each feature keeps its API, hooks, utilities and
components together and exposes a small public API through `index.ts`.

```
src/
  features/users/
    api/fetchUsers.ts          # the only place that knows the URL
    hooks/useUsers.ts          # loading / error / success state + retry
    utils/filterUsers.ts       # pure filter logic (name + city)
    utils/getCityOptions.ts    # unique, sorted cities
    components/
      UsersPage.tsx            # picks the loading / error / loaded view
      UserDirectory.tsx        # owns filter state, derives the visible users
      UserFilters.tsx          # search input + city select (controlled)
      UserTable.tsx            # presentational table
      StatusMessage.tsx        # loading / error / empty messages
    types.ts                   # User type
    UsersPage.test.tsx         # RTL tests
    index.ts                   # public export
  test/setup.ts                # jest-dom matchers + cleanup
  App.tsx                      # page layout
  main.tsx                     # entry point
```

## Design notes

- **State as a discriminated union.** `useUsers` returns
  `loading | error | success`, so impossible states (like "loading with an
  error") can't be represented.
- **Derived data isn't stored in state.** Only `query` and `city` are state;
  the city options and the filtered list are computed from them.
- **Requests are cancelled** with `AbortController` on unmount.
- **Tests mock `fetch`** directly with `vi.spyOn`, and query the UI by role and
  label the way a user would.
