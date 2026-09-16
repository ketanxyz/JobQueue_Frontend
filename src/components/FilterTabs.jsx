import { STATUSES, STATUS_META } from '../lib/statuses.js';

export default function FilterTabs({ counts, active, onChange }) {
  const tabs = [{ key: 'all', label: 'All' }, ...STATUSES.map((s) => ({ key: s, label: STATUS_META[s].label }))];

  return (
    <div className="flex flex-wrap gap-1.5 border-b border-line pb-3">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        const count = tab.key === 'all' ? counts.all : counts[tab.key] ?? 0;
        const dot = tab.key === 'all' ? null : STATUS_META[tab.key].dot;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-ink text-white'
                : 'text-ink-soft hover:bg-line-soft hover:text-ink'
            }`}
          >
            {dot && <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-white' : dot}`} />}
            {tab.label}
            <span
              className={`tabular font-mono text-xs ${
                isActive ? 'text-white/70' : 'text-ink-faint'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
