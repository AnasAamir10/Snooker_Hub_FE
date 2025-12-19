// API Service Layer
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

// Helper function to get headers
const getHeaders = (includeAuth = true, isFormData = false) => {
  const headers = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// API request wrapper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const { method = 'GET', body, includeAuth = true, isFormData = false } = options;

  const config = {
    method,
    headers: getHeaders(includeAuth, isFormData),
  };

  if (body) {
    if (isFormData) {
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
    }
  }
  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/users/register', {
      method: 'POST',
      body: userData,
      includeAuth: false,
    });
  },

  login: async (email, password) => {
    return apiRequest('/users/login', {
      method: 'POST',
      body: { email, password },
      includeAuth: false,
    });
  },
};

// Tournament API
export const tournamentAPI = {
  getAll: async () => {
    const data = await apiRequest('/tournaments');
    // Transform backend data to match frontend format
    return data.tournaments.map(t => {
      let imageUrl = '';
      if (t.imageUrl) {
        // If it's a relative path, prepend backend URL
        imageUrl = t.imageUrl.startsWith('http') ? t.imageUrl : `${BACKEND_BASE_URL}${t.imageUrl}`;
      } else if (t.image) {
        imageUrl = t.image.startsWith('http') ? t.image : `${BACKEND_BASE_URL}/uploads/${t.image}`;
      }

      return {
        id: t._id,
        name: t.title,
        date: t.date,
        fee: t.entryFee,
        description: t.description,
        image: imageUrl,
        registered: t.currentPlayers || 0,
        maxPlayers: t.maxPlayers,
        status: t.status,
      };
    });
  },

  getById: async (id) => {
    const data = await apiRequest(`/tournaments/${id}`);
    const t = data.tournament;

    let imageUrl = '';
    if (t.imageUrl) {
      imageUrl = t.imageUrl.startsWith('http') ? t.imageUrl : `${BACKEND_BASE_URL}${t.imageUrl}`;
    } else if (t.image) {
      imageUrl = t.image.startsWith('http') ? t.image : `${BACKEND_BASE_URL}/uploads/${t.image}`;
    }

    return {
      id: t._id,
      name: t.title,
      date: t.date,
      fee: t.entryFee,
      description: t.description,
      image: imageUrl,
      registered: t.currentPlayers || 0,
      maxPlayers: t.maxPlayers,
      status: t.status,
    };
  },

  create: async (tournamentData, imageFile = null) => {
    const formData = new FormData();

    // Add tournament data
    formData.append('name', tournamentData.name);
    formData.append('date', tournamentData.date);
    formData.append('fee', tournamentData.fee);
    formData.append('description', tournamentData.description || '');
    formData.append('maxPlayers', tournamentData.maxPlayers || 32);

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (tournamentData.image) {
      // If image URL is provided, use it
      formData.append('imageUrl', tournamentData.image);
    }

    return apiRequest('/tournaments', {
      method: 'POST',
      body: formData,
      isFormData: true,
    });
  },

  update: async (id, tournamentData, imageFile = null) => {
    const formData = new FormData();

    // Add tournament data
    formData.append('name', tournamentData.name);
    formData.append('date', tournamentData.date);
    formData.append('fee', tournamentData.fee);
    formData.append('description', tournamentData.description || '');
    if (tournamentData.maxPlayers) {
      formData.append('maxPlayers', tournamentData.maxPlayers);
    }

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (tournamentData.image) {
      formData.append('imageUrl', tournamentData.image);
    }

    return apiRequest(`/tournaments/${id}`, {
      method: 'PUT',
      body: formData,
      isFormData: true,
    });
  },

  delete: async (id) => {
    return apiRequest(`/tournaments/${id}`, {
      method: 'DELETE',
    });
  },
};

// User API
export const userAPI = {
  getAll: async () => {
    const data = await apiRequest('/users');
    return data.users;
  },

  getById: async (id) => {
    const data = await apiRequest(`/users/${id}`);
    return data.user;
  },

  update: async (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: userData,
    });
  },

  delete: async (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Registration API
export const registrationAPI = {
  getAll: async () => {
    const data = await apiRequest('/registrations');
    return data.registrations || [];
  },

  getById: async (id) => {
    const data = await apiRequest(`/registrations/${id}`);
    return data.registration;
  },

  register: async (tournamentId, registrationData, paymentSlipFile = null) => {
    // Ensure tournamentId is a string
    const tournamentIdStr = String(tournamentId).trim();

    if (!tournamentIdStr) {
      throw new Error('Tournament ID is required');
    }

    // Backend currently expects JSON (not FormData) since no multer middleware is configured
    // Send as JSON - backend checks for 'tournament' or 'tournamentId'
    const requestBody = {
      tournament: tournamentIdStr,
      tournamentId: tournamentIdStr,
      // Include additional fields if backend is updated to handle them
      name: registrationData?.fullName,
      phone: registrationData?.phone,
      paymentAccount: registrationData?.paymentAccount,
      // Note: File upload requires FormData + multer middleware on backend
      // For now, file upload is not supported until backend adds multer
    };


    return apiRequest('/registrations', {
      method: 'POST',
      body: requestBody,
      isFormData: false, // Send as JSON since backend doesn't have multer yet
    });
  },

  getByTournament: async (tournamentId) => {
    const data = await apiRequest(`/registrations/tournament/${tournamentId}`);
    return data.registrations || [];
  },

  update: async (id, updateData) => {
    return apiRequest(`/registrations/${id}`, {
      method: 'PUT',
      body: updateData,
    });
  },

  cancel: async (id) => {
    return apiRequest(`/registrations/${id}`, {
      method: 'DELETE',
    });
  },
};

