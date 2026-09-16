export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="divide-y divide-line-soft">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
          <div className="h-3 w-10 animate-pulse rounded bg-line-soft" />
          <div className="h-3 flex-1 max-w-[220px] animate-pulse rounded bg-line-soft" />
          <div className="hidden h-3 w-20 animate-pulse rounded bg-line-soft sm:block" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-line-soft" />
          <div className="hidden h-3 w-24 animate-pulse rounded bg-line-soft md:block" />
        </div>
      ))}
    </div>
  );
}
