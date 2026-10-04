// Session token handling for the eTMF tool. The token lives in sessionStorage (cleared when the tab closes).
const TOKEN_KEY = 'etmf_token';
export const UNAUTHORIZED_EVENT = 'etmf-unauthorized';

export const getToken = () => {
  try { return sessionStorage.getItem(TOKEN_KEY); } catch { return null; }
};
export const setToken = (token) => {
  try { sessionStorage.setItem(TOKEN_KEY, token); } catch { /* storage unavailable */ }
};
export const clearToken = () => {
  try { sessionStorage.removeItem(TOKEN_KEY); } catch { /* storage unavailable */ }
};

// Attach the Bearer token to every /api/etmf request and sign the user out when the session is rejected.
export const installAuthFetch = () => {
  if (window.__etmfFetchInstalled) return;
  window.__etmfFetchInstalled = true;
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    if (!url.startsWith('/api/etmf')) return originalFetch(input, init);

    const headers = new Headers(init.headers || (typeof input !== 'string' ? input.headers : undefined));
    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);

    const response = await originalFetch(input, { ...init, headers });
    if (response.status === 401 && !url.includes('/users/login')) {
      clearToken();
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    }
    return response;
  };
};
