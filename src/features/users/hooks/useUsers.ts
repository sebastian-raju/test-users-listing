import { useCallback, useEffect, useState } from 'react'
import { fetchUsers } from '../api/fetchUsers'
import type { User } from '../types'

export type UsersState =
  { status: 'loading' } | { status: 'error'; error: string } | { status: 'success'; users: User[] }

interface UseUsersResult {
  state: UsersState
  retry: () => void
}

/**
 * Loads the user list and exposes its loading / error / success state.
 * The in-flight request is aborted on unmount (and on StrictMode's double effect).
 */
export function useUsers(): UseUsersResult {
  const [state, setState] = useState<UsersState>({ status: 'loading' })
  // Bumping this re-runs the effect, which is how `retry` refetches.
  const [requestId, setRequestId] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchUsers(controller.signal)
      .then((users) => setState({ status: 'success', users }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const message = error instanceof Error ? error.message : 'Something went wrong'
        setState({ status: 'error', error: message })
      })

    return () => controller.abort()
  }, [requestId])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setRequestId((id) => id + 1)
  }, [])

  return { state, retry }
}
