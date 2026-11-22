import type { User } from '../types'

/** Unique city names from the users, sorted alphabetically. */
export function getCityOptions(users: User[]): string[] {
  const cities = new Set(users.map((user) => user.address.city))
  return [...cities].sort((a, b) => a.localeCompare(b))
}
