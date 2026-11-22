import { UsersPage } from './features/users'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">User Directory</h1>
          <p className="mt-1 text-sm text-slate-600">
            Browse users and find who you're looking for.
          </p>
        </header>
        <UsersPage />
      </main>
    </div>
  )
}

export default App
