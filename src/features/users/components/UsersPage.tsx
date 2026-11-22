import { useUsers } from '../hooks/useUsers'
import { StatusMessage } from './StatusMessage'
import { UserDirectory } from './UserDirectory'

/** Fetches users and renders the matching loading / error / loaded view. */
export function UsersPage() {
  const { state, retry } = useUsers()

  switch (state.status) {
    case 'loading':
      return <StatusMessage variant="loading" />

    case 'error':
      return <StatusMessage variant="error" message={state.error} onRetry={retry} />

    case 'success':
      return <UserDirectory users={state.users} />
  }
}
