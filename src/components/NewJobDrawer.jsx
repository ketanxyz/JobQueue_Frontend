import { useEffect, useRef, useState } from 'react';

const TITLE_MAX = 200;
const TYPE_MAX = 100;

const SUGGESTED_TYPES = ['report', 'import', 'export', 'email', 'cleanup'];

export default function NewJobDrawer({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTitle('');
      setType('');
      setFieldErrors({});
      const t = setTimeout(() => titleRef.current?.focus(), 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && open) onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  function validate() {
    const errors = {};
    const trimmedTitle = title.trim();
    const trimmedType = type.trim();
    if (!trimmedTitle) errors.title = 'Title is required.';
    else if (trimmedTitle.length > TITLE_MAX) errors.title = `Keep it under ${TITLE_MAX} characters.`;
    if (!trimmedType) errors.type = 'Type is required.';
    else if (trimmedType.length > TYPE_MAX) errors.type = `Keep it under ${TYPE_MAX} characters.`;
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({ title: title.trim(), type: type.trim() });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/20 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create a new job"
        className={`absolute right-0 top-0 h-full w-full max-w-sm border-l border-line bg-surface shadow-panel transition-transform duration-200 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <form onSubmit={handleSubmit} className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="text-sm font-semibold text-ink">New job</h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-ink-faint hover:bg-line-soft hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            <div>
              <label htmlFor="job-title" className="mb-1.5 block text-sm font-medium text-ink">
                Title
              </label>
              <input
                ref={titleRef}
                id="job-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Export monthly report"
                maxLength={TITLE_MAX + 20}
                aria-invalid={Boolean(fieldErrors.title)}
                aria-describedby={fieldErrors.title ? 'job-title-error' : undefined}
                className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent ${
                  fieldErrors.title ? 'border-status-failed' : 'border-line'
                }`}
              />
              <div className="mt-1 flex items-center justify-between">
                {fieldErrors.title ? (
                  <p id="job-title-error" className="text-xs text-status-failed">
                    {fieldErrors.title}
                  </p>
                ) : (
                  <span />
                )}
                <span className="font-mono text-xs text-ink-faint tabular">
                  {title.length}/{TITLE_MAX}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="job-type" className="mb-1.5 block text-sm font-medium text-ink">
                Type
              </label>
              <input
                id="job-type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="report"
                maxLength={TYPE_MAX + 20}
                aria-invalid={Boolean(fieldErrors.type)}
                aria-describedby={fieldErrors.type ? 'job-type-error' : undefined}
                className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent ${
                  fieldErrors.type ? 'border-status-failed' : 'border-line'
                }`}
              />
              {fieldErrors.type && (
                <p id="job-type-error" className="mt-1 text-xs text-status-failed">
                  {fieldErrors.type}
                </p>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SUGGESTED_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-ink-soft hover:border-ink-faint hover:text-ink"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-ink-faint">
              New jobs start as <span className="font-mono">pending</span> automatically.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-soft hover:bg-line-soft"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {submitting ? 'Creating…' : 'Create job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
