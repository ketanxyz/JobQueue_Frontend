export const STATUSES = ['pending', 'running', 'completed', 'failed'];

export const STATUS_META = {
  pending: { label: 'Pending', dot: 'bg-status-pending', text: 'text-status-pending', soft: 'bg-status-pending-soft' },
  running: { label: 'Running', dot: 'bg-status-running', text: 'text-status-running', soft: 'bg-status-running-soft' },
  completed: { label: 'Completed', dot: 'bg-status-completed', text: 'text-status-completed', soft: 'bg-status-completed-soft' },
  failed: { label: 'Failed', dot: 'bg-status-failed', text: 'text-status-failed', soft: 'bg-status-failed-soft' },
};

// Mirrors the backend rule: a completed or failed job can't go back to running.
export function isTransitionAllowed(current, next) {
  if (current === next) return false;
  if ((current === 'completed' || current === 'failed') && next === 'running') {
    return false;
  }
  return true;
}

export function nextStatusOptions(current) {
  return STATUSES.filter((s) => isTransitionAllowed(current, s));
}
