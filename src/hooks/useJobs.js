import { useCallback, useEffect, useState } from 'react';
import { createJob, deleteJob, fetchJobs, updateJobStatus } from '../api/jobs.js';

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [error, setError] = useState(null);

  // Per-job in-flight tracking so a status change or delete on one row
  // doesn't block the rest of the table.
  const [pendingIds, setPendingIds] = useState(() => new Set());

  const setRowPending = useCallback((id, isPending) => {
    setPendingIds((current) => {
      const next = new Set(current);
      if (isPending) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const load = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const data = await fetchJobs();
      setJobs(Array.isArray(data) ? data : []);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addJob = useCallback(async (payload) => {
    const job = await createJob(payload);
    setJobs((current) => [job, ...current]);
    return job;
  }, []);

  const changeStatus = useCallback(
    async (id, nextStatus) => {
      setRowPending(id, true);
      try {
        const updated = await updateJobStatus(id, nextStatus);
        setJobs((current) => current.map((job) => (job.id === id ? updated : job)));
        return updated;
      } finally {
        setRowPending(id, false);
      }
    },
    [setRowPending],
  );

  const removeJob = useCallback(
    async (id) => {
      setRowPending(id, true);
      try {
        await deleteJob(id);
        setJobs((current) => current.filter((job) => job.id !== id));
      } finally {
        setRowPending(id, false);
      }
    },
    [setRowPending],
  );

  return {
    jobs,
    status,
    error,
    pendingIds,
    reload: load,
    addJob,
    changeStatus,
    removeJob,
  };
}
