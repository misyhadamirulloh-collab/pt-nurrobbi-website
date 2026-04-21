const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'nurrobbi2024'
};

const AUTH_KEY = 'nurrobbi-admin-auth';

export function login(username: string, password: string): boolean {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    const token = btoa(`${username}:${Date.now()}`);
    localStorage.setItem(AUTH_KEY, token);
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_KEY) !== null;
}
