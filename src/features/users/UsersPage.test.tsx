import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { UsersPage } from './components/UsersPage'
import type { User } from './types'

const USERS: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    email: 'leanne@example.com',
    address: { city: 'Gwenborough' },
    company: { name: 'Romaguera-Crona' },
  },
  {
    id: 2,
    name: 'Ervin Howell',
    email: 'ervin@example.com',
    address: { city: 'Wisokyburgh' },
    company: { name: 'Deckow-Crist' },
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    email: 'clementine@example.com',
    address: { city: 'McKenziehaven' },
    company: { name: 'Romaguera-Jacobson' },
  },
]

function mockFetchSuccess(users: User[] = USERS) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json(users))
}

/** Names in the table body, in display order. */
function getVisibleNames(): string[] {
  const [, ...bodyRows] = screen.queryAllByRole('row')
  return bodyRows.map((row) => within(row).getAllByRole('cell')[0].textContent ?? '')
}

async function renderLoadedPage() {
  const user = userEvent.setup()
  render(<UsersPage />)
  await screen.findByRole('table')
  return {
    user,
    searchInput: screen.getByRole('searchbox', { name: /search by name/i }),
    citySelect: screen.getByRole('combobox', { name: /city/i }),
  }
}

describe('UsersPage', () => {
  it('shows a loading state, then the users with name, email, city and company', async () => {
    mockFetchSuccess()
    render(<UsersPage />)

    expect(screen.getByRole('status')).toHaveTextContent(/loading users/i)

    const leanneRow = await screen.findByRole('row', { name: /leanne graham/i })
    const cells = within(leanneRow).getAllByRole('cell')
    expect(cells.map((cell) => cell.textContent)).toEqual([
      'Leanne Graham',
      'leanne@example.com',
      'Gwenborough',
      'Romaguera-Crona',
    ])
    expect(getVisibleNames()).toHaveLength(USERS.length)
  })

  it('builds the city options from the data, with "All cities" first', async () => {
    mockFetchSuccess()
    const { citySelect } = await renderLoadedPage()

    const options = within(citySelect).getAllByRole('option')
    expect(options.map((option) => option.textContent)).toEqual([
      'All cities',
      'Gwenborough',
      'McKenziehaven',
      'Wisokyburgh',
    ])
  })

  it('filters by name, case-insensitively', async () => {
    mockFetchSuccess()
    const { user, searchInput } = await renderLoadedPage()

    await user.type(searchInput, 'LEANNE')

    expect(getVisibleNames()).toEqual(['Leanne Graham'])
  })

  it('combines the name search and the city filter, and shows an empty state', async () => {
    mockFetchSuccess()
    const { user, searchInput, citySelect } = await renderLoadedPage()

    // "e" matches all three names; the city narrows it to one.
    await user.type(searchInput, 'e')
    await user.selectOptions(citySelect, 'Wisokyburgh')
    expect(getVisibleNames()).toEqual(['Ervin Howell'])

    // A name from a different city → nothing matches both.
    await user.clear(searchInput)
    await user.type(searchInput, 'leanne')
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('No users found')

    // Back to "All cities" brings Leanne back.
    await user.selectOptions(citySelect, 'All cities')
    expect(getVisibleNames()).toEqual(['Leanne Graham'])
  })

  it('shows an error state and recovers on "Try again"', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(new Response(null, { status: 500 }))
      .mockResolvedValueOnce(Response.json(USERS))
    const user = userEvent.setup()
    render(<UsersPage />)

    expect(await screen.findByRole('alert')).toHaveTextContent('Failed to load users (HTTP 500)')

    await user.click(screen.getByRole('button', { name: /try again/i }))

    expect(await screen.findByRole('table')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledTimes(2)
  })
})
