import JobRow from './JobRow.jsx';
import EmptyState from './EmptyState.jsx';

export default function JobsTable({ jobs, pendingIds, isFiltered, onChangeStatus, onDelete, onCreate, onClearFilter }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-surface">
        <EmptyState filtered={isFiltered} onCreate={onCreate} onClearFilter={onClearFilter} />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <div className="hidden items-center gap-4 border-b border-line bg-canvas px-5 py-2.5 text-xs font-medium text-ink-faint sm:flex">
        <span className="w-14 shrink-0">ID</span>
        <span className="flex-1">Title</span>
        <span className="w-28 shrink-0">Type</span>
        <span className="w-28 shrink-0">Status</span>
        <span className="hidden w-32 shrink-0 lg:block">Created</span>
        <span className="w-44 shrink-0 text-right">Actions</span>
      </div>
      <div className="divide-y divide-line-soft">
        {jobs.map((job) => (
          <JobRow
            key={job.id}
            job={job}
            isPending={pendingIds.has(job.id)}
            onChangeStatus={onChangeStatus}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
