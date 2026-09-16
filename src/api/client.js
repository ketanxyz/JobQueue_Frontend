export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

/**
 * A small wrapper around fetch that talks to the Job Queue API.
 * It normalises NestJS's error body (`{ statusCode, message, error }`)
 * into a single Error so callers only need one catch path.
 */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch (networkError) {
    throw new ApiError(
      `Can't reach the API at ${API_BASE_URL}. Is the server running?`,
      0,
    );
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = Array.isArray(body?.message)
      ? body.message.join(' ')
      : body?.message || `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return body;
}
