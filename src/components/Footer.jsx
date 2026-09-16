export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Job Queue Dashboard &mdash; a client for the local queue API.</p>
        <p className="font-mono">v1.0.0</p>
      </div>
    </footer>
  );
}
