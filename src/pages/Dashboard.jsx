import { useEffect, useMemo, useState } from 'react';
import { useJobs } from '../hooks/useJobs.js';
import { useToasts } from '../hooks/useToasts.jsx';
import FilterTabs from '../components/FilterTabs.jsx';
import JobsTable from '../components/JobsTable.jsx';
import TableSkeleton from '../components/TableSkeleton.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import NewJobDrawer from '../components/NewJobDrawer.jsx';
export default function Dashboard({ onConnectionChange }) {
  const { jobs, status, error, pendingIds, reload, addJob, changeStatus, removeJob } = useJobs();
  const { push } = useToasts();
  const [filter, setFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (status === 'ready') onConnectionChange?.('ok');
    if (status === 'error') onConnectionChange?.('down');
  }, [status, onConnectionChange]);

  const counts = useMemo(() => {
    const base = { all: jobs.length, pending: 0, running: 0, completed: 0, failed: 0 };
    for (const job of jobs) {
      if (base[job.status] !== undefined) base[job.status] += 1;
    }
    return base;
  }, [jobs]);

  const visibleJobs = useMemo(() => {
    const list = filter === 'all' ? jobs : jobs.filter((job) => job.status === filter);
    return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [jobs, filter]);

  async function handleCreate(payload) {
    try {
      const job = await addJob(payload);
      push(`Job "${job.title}" was created.`, { tone: 'success' });
      setDrawerOpen(false);
      setFilter('all');
    } catch (err) {
      push(err.message || 'Could not create the job.', { tone: 'error' });
    }
  }

  async function handleChangeStatus(id, nextStatus) {
    try {
      await changeStatus(id, nextStatus);
      push(`Job #${id} moved to ${nextStatus}.`, { tone: 'success' });
    } catch (err) {
      push(err.message || 'Could not update the job status.', { tone: 'error' });
    }
  }

  async function handleDelete(id) {
    try {
      await removeJob(id);
      push(`Job #${id} was deleted.`);
    } catch (err) {
      push(err.message || 'Could not delete the job.', { tone: 'error' });
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink">Jobs</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {status === 'ready'
              ? `${counts.all} job${counts.all === 1 ? '' : 's'} in the queue`
              : 'Tracking work as it moves through the queue'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          New job
        </button>
      </div>

      {status === 'error' ? (
        <ErrorBanner message={error?.message || 'Something went wrong.'} onRetry={reload} />
      ) : (
        <>
          <FilterTabs counts={counts} active={filter} onChange={setFilter} />
          <div className="mt-4">
            {status === 'loading' ? (
              <div className="overflow-hidden rounded-lg border border-line bg-surface">
                <TableSkeleton />
              </div>
            ) : (
              <JobsTable
                jobs={visibleJobs}
                pendingIds={pendingIds}
                isFiltered={filter !== 'all'}
                onChangeStatus={handleChangeStatus}
                onDelete={handleDelete}
                onCreate={() => setDrawerOpen(true)}
                onClearFilter={() => setFilter('all')}
              />
            )}
          </div>
        </>
      )}

      <NewJobDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={handleCreate} />
    </div>
  );
}
