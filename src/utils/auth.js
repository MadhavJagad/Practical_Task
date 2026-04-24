const USER_KEY = 'user';
const VISIT_KEY = 'dashboardVisits';

/** Save the authenticated user object to localStorage. */
export const saveUser = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.warn('Failed to persist user to localStorage:', err);
  }
};

/** Read the authenticated user object from localStorage. Returns null if absent. */
export const loadUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/** Remove the user object (logout). */
export const clearUser = () => {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // ignore
  }
};

/** Increment the dashboard visit counter and return the NEW count. */
export const incrementVisitCount = () => {
  try {
    const current = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
    const next = current + 1;
    localStorage.setItem(VISIT_KEY, String(next));
    return next;
  } catch {
    return 1;
  }
};

/** Read the current visit count without incrementing. */
export const getVisitCount = () => {
  try {
    return parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
  } catch {
    return 0;
  }
};