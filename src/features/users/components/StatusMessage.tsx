type StatusMessageProps =
  | { variant: 'loading' }
  | { variant: 'empty' }
  | { variant: 'error'; message: string; onRetry: () => void }

const BOX = 'rounded-lg border px-4 py-10 text-center text-sm'

export function StatusMessage(props: StatusMessageProps) {
  switch (props.variant) {
    case 'loading':
      return (
        <div role="status" className={`${BOX} border-slate-200 bg-white text-slate-600`}>
          <span
            aria-hidden="true"
            className="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 align-middle"
          />
          Loading users…
        </div>
      )

    case 'empty':
      return (
        <div role="status" className={`${BOX} border-slate-200 bg-white text-slate-600`}>
          No users found
        </div>
      )

    case 'error':
      return (
        <div role="alert" className={`${BOX} border-red-200 bg-red-50 text-red-800`}>
          <p className="font-medium">Couldn't load users.</p>
          <p className="mt-1 text-red-700">{props.message}</p>
          <button
            type="button"
            onClick={props.onRetry}
            className="mt-4 rounded-md bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Try again
          </button>
        </div>
      )
  }
}
