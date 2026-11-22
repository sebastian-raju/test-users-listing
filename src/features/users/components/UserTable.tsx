import type { User } from '../types'

interface UserTableProps {
  users: User[]
}

const COLUMNS = ['Name', 'Email', 'City', 'Company'] as const

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <caption className="sr-only">Users</caption>
        <thead className="bg-slate-50">
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium whitespace-nowrap text-slate-900">
                {user.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <a href={`mailto:${user.email}`} className="text-indigo-600 hover:underline">
                  {user.email}
                </a>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-700">{user.address.city}</td>
              <td className="px-4 py-3 whitespace-nowrap text-slate-700">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
