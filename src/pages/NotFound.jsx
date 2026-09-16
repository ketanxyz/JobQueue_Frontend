import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <p className="font-mono text-sm text-ink-faint">404</p>
      <h1 className="text-lg font-semibold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist. It might have been moved or the link is wrong.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-ink px-3.5 py-1.5 text-sm font-medium text-white hover:bg-ink/90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
