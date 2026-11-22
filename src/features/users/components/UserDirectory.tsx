import { useMemo, useState } from 'react'
import type { User } from '../types'
import { ALL_CITIES, filterUsers } from '../utils/filterUsers'
import { getCityOptions } from '../utils/getCityOptions'
import { StatusMessage } from './StatusMessage'
import { UserFilters } from './UserFilters'
import { UserTable } from './UserTable'

interface UserDirectoryProps {
  users: User[]
}

/** The loaded view: filter controls plus the filtered table. Owns the filter state. */
export function UserDirectory({ users }: UserDirectoryProps) {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState(ALL_CITIES)

  const cities = useMemo(() => getCityOptions(users), [users])
  const visibleUsers = useMemo(() => filterUsers(users, { query, city }), [users, query, city])

  return (
    <section aria-label="User directory">
      <UserFilters
        query={query}
        city={city}
        cities={cities}
        onQueryChange={setQuery}
        onCityChange={setCity}
      />
      {visibleUsers.length === 0 ? (
        <StatusMessage variant="empty" />
      ) : (
        <UserTable users={visibleUsers} />
      )}
    </section>
  )
}
