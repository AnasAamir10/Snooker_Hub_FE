// Simple in-memory user storage
let users = [
  {
    id: 1,
    email: 'admin@snookerhub.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1234567890',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'user@snookerhub.com',
    password: 'user123',
    firstName: 'Regular',
    lastName: 'User',
    phone: '+0987654321',
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

// User management functions
export const userService = {
  // Find user by email and password
  authenticate: (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  // Find user by email only
  findByEmail: (email) => {
    const user = users.find(u => u.email === email);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  },

  // Create new user
  create: (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // Get all users (for admin)
  getAll: () => {
    return users.map(user => {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  },

  // Update user
  update: (id, userData) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...userData };
      const { password: _, ...userWithoutPassword } = users[userIndex];
      return userWithoutPassword;
    }
    return null;
  },

  // Delete user
  delete: (id) => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      return users.splice(userIndex, 1)[0];
    }
    return null;
  },

  // Check if email exists
  emailExists: (email) => {
    return users.some(u => u.email === email);
  }
};