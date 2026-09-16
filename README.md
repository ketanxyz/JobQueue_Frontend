# Job Queue Manager Frontend

The frontend for the Job Queue Manager. It provides a dashboard for viewing,
filtering, creating, updating, and deleting jobs through the NestJS API in
[`../backend`](../backend).

## Features

- View all jobs with their type, status, and creation time
- Filter jobs by status with live counts
- Create jobs with client-side validation
- Move jobs through the supported status lifecycle
- Delete jobs with inline confirmation
- Show loading, empty, error, and success states
- Display API errors as user-facing notifications

## Tech Stack

- React 18
- Vite
- React Router
- Tailwind CSS
- Native `fetch` for API requests

## Requirements

- Node.js 20 or later
- npm
- The backend running locally or deployed

## Local Setup

From this directory, install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory:

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

Open <http://localhost:5173> in a browser. Start the backend separately from
the `backend` directory with `npm run start:dev`.

## Environment Variables

Vite exposes only variables prefixed with `VITE_` to browser code.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | No | Base URL of the backend API. Defaults to `http://localhost:3000`. |

For a deployed frontend, set this variable in the hosting provider's build
environment. For example:

```dotenv
VITE_API_BASE_URL=https://jobqueue-backend.onrender.com
```

After changing a `VITE_` variable, rebuild and redeploy the frontend. Vite
injects these values at build time.

## Backend and CORS

The backend must allow the origin from which the frontend is served. The
current backend configuration allows:

- `http://localhost:5173`
- `https://jobqueuemanager.netlify.app`
- Any origins supplied through the backend's `FRONTEND_URL` variable

For another deployment URL, set `FRONTEND_URL` in the backend environment and
redeploy the backend. Do not add a trailing slash to the frontend origin.

## Available Scripts

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Production Deployment

### Netlify

Configure the site with:

```text
Base directory: Frontend
Build command: npm run build
Publish directory: Frontend/dist
```

If Netlify uses `Frontend` as its base directory, use `dist` as the publish
directory instead. Add this environment variable in Netlify before building:

```text
VITE_API_BASE_URL=https://jobqueue-backend.onrender.com
```

### SPA Routing

The application uses client-side routing. If a host returns a 404 when a route
is refreshed directly, configure it to serve `index.html` as the fallback for
unknown paths.

## Project Structure

```text
src/
  api/          API client and job endpoints
  components/   Reusable dashboard UI components
  hooks/        Job data and toast state hooks
  lib/          Formatting and status helpers
  pages/        Dashboard and not-found pages
```
