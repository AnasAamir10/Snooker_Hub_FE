// Auth utility functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const getUserFromStorage = () => {
  const userStr = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const setUserInStorage = (user) => {
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUser');
  }
};

export const removeUserFromStorage = () => {
  sessionStorage.removeItem('currentUser');
  localStorage.removeItem('currentUser');
};

