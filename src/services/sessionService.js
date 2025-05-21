const SESSION_KEY = 'user_logged_in';

export function loginUserSession() {
  localStorage.setItem(SESSION_KEY, 'true');
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function isUserLoggedIn() {
  return localStorage.getItem(SESSION_KEY) === 'true';
}