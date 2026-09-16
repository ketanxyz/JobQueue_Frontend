import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-ink text-white' : 'text-ink-soft hover:bg-line-soft hover:text-ink'
  }`;

export default function Navbar({ apiBaseUrl, connection }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-ink text-[11px] font-semibold text-white">
              Q
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink">Queue</span>
          </NavLink>
          <nav className="hidden items-center gap-1 sm:flex">
            <NavLink to="/" end className={navLinkClass}>
              Dashboard
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs text-ink-soft sm:flex"
            title={apiBaseUrl}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                connection === 'ok'
                  ? 'bg-status-completed'
                  : connection === 'down'
                    ? 'bg-status-failed'
                    : 'bg-ink-faint'
              }`}
            />
            <span className="font-mono">{apiBaseUrl.replace(/^https?:\/\//, '')}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
