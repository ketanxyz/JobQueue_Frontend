export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-status-failed/25 bg-status-failed-soft px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-status-failed"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="8" cy="11" r="0.75" fill="currentColor" />
        </svg>
        <div>
          <p className="text-sm font-medium text-ink">Couldn&apos;t load jobs</p>
          <p className="mt-0.5 text-sm text-ink-soft">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="shrink-0 rounded-md border border-status-failed/30 bg-white px-3 py-1.5 text-sm font-medium text-status-failed transition-colors hover:bg-status-failed hover:text-white"
      >
        Try again
      </button>
    </div>
  );
}
