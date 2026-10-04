// Base URL of the backend. Empty in dev (Vite proxies /api), set VITE_API_URL in production.
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiPost = async (path, body) => {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  let data = null;
  try { data = await response.json(); } catch { /* non-JSON error body */ }
  if (!response.ok) {
    throw new Error((data && data.error) || `Request failed (${response.status})`);
  }
  return data;
};
