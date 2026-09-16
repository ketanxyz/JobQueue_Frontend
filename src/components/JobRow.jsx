import { useState } from 'react';
import StatusPill from './StatusPill.jsx';
import { formatId, formatTimestamp } from '../lib/format.js';
import { nextStatusOptions, STATUS_META } from '../lib/statuses.js';

function Spinner({ className = '' }) {
  return (
    <svg className={`animate-spin ${className}`} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <path d="M12.5 7A5.5 5.5 0 0 0 7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StatusSelect({ job, isPending, onChangeStatus }) {
  const options = nextStatusOptions(job.status);

  if (options.length === 0) {
    return <span className="text-xs text-ink-faint">No transitions</span>;
  }

  return (
    <div className="relative">
      <select
        aria-label={`Update status for job ${job.id}`}
        disabled={isPending}
        value=""
        onChange={(e) => {
          const value = e.target.value;
          if (value) onChangeStatus(job.id, value);
        }}
        className="cursor-pointer appearance-none rounded-md border border-line bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-ink-soft transition-colors hover:border-ink-faint disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="" disabled>
          Move to&hellip;
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {STATUS_META[opt].label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-faint"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
      >
        <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function DeleteControl({ job, isPending, onDelete }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="text-xs text-ink-soft">Delete?</span>
        <button
          type="button"
          onClick={() => onDelete(job.id)}
          disabled={isPending}
          className="rounded-md bg-status-failed px-2 py-1 text-xs font-medium text-white hover:bg-status-failed/90 disabled:opacity-50"
        >
          {isPending ? <Spinner /> : 'Confirm'}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={isPending}
          className="rounded-md px-2 py-1 text-xs font-medium text-ink-soft hover:bg-line-soft"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      disabled={isPending}
      aria-label={`Delete job ${job.id}`}
      className="rounded-md p-1.5 text-ink-faint transition-colors hover:bg-status-failed-soft hover:text-status-failed disabled:opacity-50"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.5 3.5H11.5M5.5 3.5V2.5C5.5 2.22386 5.72386 2 6 2H8C8.27614 2 8.5 2.22386 8.5 2.5V3.5M6 6.5V10M8 6.5V10M3.5 3.5L4 11C4 11.5523 4.44772 12 5 12H9C9.55228 12 10 11.5523 10 11L10.5 3.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function JobRow({ job, isPending, onChangeStatus, onDelete }) {
  return (
    <>
      {/* Desktop / tablet row */}
      <div
        className={`hidden items-center gap-4 px-5 py-3.5 transition-colors sm:flex ${
          isPending ? 'opacity-60' : 'hover:bg-canvas'
        }`}
      >
        <span className="w-14 shrink-0 font-mono text-xs text-ink-faint tabular">{formatId(job.id)}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{job.title}</p>
        </div>
        <span className="w-28 shrink-0 truncate text-xs text-ink-soft">{job.type}</span>
        <span className="w-28 shrink-0">
          <StatusPill status={job.status} />
        </span>
        <span className="hidden w-32 shrink-0 font-mono text-xs text-ink-faint tabular lg:block">
          {formatTimestamp(job.createdAt)}
        </span>
        <div className="flex w-44 shrink-0 items-center justify-end gap-2">
          {isPending ? (
            <Spinner className="text-ink-faint" />
          ) : (
            <>
              <StatusSelect job={job} isPending={isPending} onChangeStatus={onChangeStatus} />
              <DeleteControl job={job} isPending={isPending} onDelete={onDelete} />
            </>
          )}
        </div>
      </div>

      {/* Mobile card */}
      <div className={`flex flex-col gap-2.5 px-4 py-4 sm:hidden ${isPending ? 'opacity-60' : ''}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{job.title}</p>
            <p className="mt-0.5 font-mono text-xs text-ink-faint">
              {formatId(job.id)} &middot; {job.type}
            </p>
          </div>
          <StatusPill status={job.status} />
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-ink-faint tabular">{formatTimestamp(job.createdAt)}</span>
          <div className="flex items-center gap-2">
            {isPending ? (
              <Spinner className="text-ink-faint" />
            ) : (
              <>
                <StatusSelect job={job} isPending={isPending} onChangeStatus={onChangeStatus} />
                <DeleteControl job={job} isPending={isPending} onDelete={onDelete} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
