# Job Queue Dashboard (Frontend)

A React dashboard for the [Job Queue Management Backend](../backend). Lists jobs, filters by status, creates new jobs, moves jobs through their status lifecycle, and deletes them.

## Tech Stack

- React 18 + Vite
- React Router
- Tailwind CSS
- No extra state library — a couple of small hooks (`useJobs`, `useToasts`) are enough for this scope

## Project Structure

```text
src/
  api/            fetch wrapper + jobs endpoints
  components/     Navbar, Footer, table, filters, create-job drawer, toasts...
  hooks/          useJobs (data + mutations), useToasts (notifications)
  lib/            status rules/labels, date formatting
  pages/          Dashboard, NotFound
```

## Setup

```bash
npm install
cp .env.example .env   # point this at your backend if it isn't on localhost:3000
npm run dev
```

The app runs at `http://localhost:5173` and expects the backend at the URL in `VITE_API_BASE_URL` (defaults to `http://localhost:3000`). Start the backend first — see its own README for `npm run start:dev`.

## What it does

- **List & filter** — jobs load on mount; tabs filter by status and show a live count for each.
- **Create** — a side panel validates title/type client-side (mirrors the backend's `MaxLength` rules) before submitting.
- **Change status** — the "Move to…" menu only offers transitions the backend allows, so a completed/failed job never shows "running" as an option. If the API still rejects a transition, the error surfaces as a toast.
- **Delete** — a two-step inline confirm (no modal) before the row is removed.
- **Loading / error states** — skeleton rows while fetching, a retry banner if the request fails, and an empty state for a filtered view with zero results.

## Notes

- CORS: if the backend blocks requests from `http://localhost:5173`, enable CORS in `main.ts` (`app.enableCors()`), since the backend README doesn't have it configured by default.
- Build for production with `npm run build`; output goes to `dist/`.
