import type { User } from '../types'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

/**
 * Fetches all users. Throws if the request fails or returns a non-2xx status.
 * Pass an AbortSignal to cancel the request (e.g. when a component unmounts).
 */
export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { signal })

  if (!response.ok) {
    throw new Error(`Failed to load users (HTTP ${response.status})`)
  }

  // Trust boundary: the API response is assumed to match the User shape.
  return (await response.json()) as User[]
}
