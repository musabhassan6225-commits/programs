export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem('dpms_token');
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('dpms_token', token);
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem('dpms_token');
}

export function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
