import { STATUS_META } from '../lib/statuses.js';

export default function StatusPill({ status }) {
  const meta = STATUS_META[status] ?? {
    label: status,
    dot: 'bg-ink-faint',
    text: 'text-ink-soft',
    soft: 'bg-line-soft',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.soft} ${meta.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
