import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-ink text-[11px] font-semibold text-white">
              Q
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink">Queue Manager</span>
        </NavLink>
      </div>
    </header>
  );
}
