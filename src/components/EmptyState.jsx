export default function EmptyState({ filtered, onCreate, onClearFilter }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-4 py-16 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" className="text-ink-faint" />
          <path d="M2 7H14" stroke="currentColor" strokeWidth="1.2" className="text-ink-faint" />
        </svg>
      </div>
      {filtered ? (
        <>
          <p className="text-sm font-medium text-ink">No jobs match this filter</p>
          <p className="max-w-xs text-sm text-ink-soft">
            Switch to a different status, or clear the filter to see every job in the queue.
          </p>
          <button
            type="button"
            onClick={onClearFilter}
            className="mt-1 rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink hover:bg-line-soft"
          >
            Clear filter
          </button>
        </>
      ) : (
        <>
          <p className="text-sm font-medium text-ink">The queue is empty</p>
          <p className="max-w-xs text-sm text-ink-soft">
            Create your first job to see it move through pending, running, and completed.
          </p>
          <button
            type="button"
            onClick={onCreate}
            className="mt-1 rounded-md bg-ink px-3 py-1.5 text-sm font-medium text-white hover:bg-ink/90"
          >
            New job
          </button>
        </>
      )}
    </div>
  );
}
