import type { User } from '../types'

/** City filter value meaning "don't filter by city". */
export const ALL_CITIES = ''

export interface UserFilterCriteria {
  query: string
  city: string
}

/**
 * Returns the users whose name contains `query` (case-insensitive)
 * AND whose city equals `city` (or any city when `city` is ALL_CITIES).
 */
export function filterUsers(users: User[], { query, city }: UserFilterCriteria): User[] {
  const normalizedQuery = query.trim().toLowerCase()

  return users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(normalizedQuery)
    const matchesCity = city === ALL_CITIES || user.address.city === city
    return matchesName && matchesCity
  })
}
