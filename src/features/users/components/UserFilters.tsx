import { useId } from 'react'
import { ALL_CITIES } from '../utils/filterUsers'

interface UserFiltersProps {
  query: string
  city: string
  cities: string[]
  onQueryChange: (query: string) => void
  onCityChange: (city: string) => void
}

const FIELD =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none'

export function UserFilters({
  query,
  city,
  cities,
  onQueryChange,
  onCityChange,
}: UserFiltersProps) {
  const searchId = useId()
  const cityId = useId()

  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-[2fr_1fr]">
      <div>
        <label htmlFor={searchId} className="mb-1 block text-sm font-medium text-slate-700">
          Search by name
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="e.g. Leanne"
          className={FIELD}
        />
      </div>

      <div>
        <label htmlFor={cityId} className="mb-1 block text-sm font-medium text-slate-700">
          City
        </label>
        <select
          id={cityId}
          value={city}
          onChange={(event) => onCityChange(event.target.value)}
          className={FIELD}
        >
          <option value={ALL_CITIES}>All cities</option>
          {cities.map((cityOption) => (
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
