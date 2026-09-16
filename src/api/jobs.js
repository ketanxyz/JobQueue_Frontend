import { request } from './client.js';

export function fetchJobs() {
  return request('/jobs');
}

export function createJob({ title, type }) {
  return request('/jobs', {
    method: 'POST',
    body: JSON.stringify({ title, type }),
  });
}

export function updateJobStatus(id, status) {
  return request(`/jobs/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteJob(id) {
  return request(`/jobs/${id}`, { method: 'DELETE' });
}
