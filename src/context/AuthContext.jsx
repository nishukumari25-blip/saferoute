import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorage, setStorage, removeStorage, STORAGE_KEYS } from '../utils/storage';
import { DEFAULT_USER } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user exists in localStorage, otherwise initialize with demo user
    const savedUser = getStorage(STORAGE_KEYS.USER, null);
    if (!savedUser) {
      setStorage(STORAGE_KEYS.USER, DEFAULT_USER);
      return DEFAULT_USER;
    }
    return savedUser;
  });

  const [usersList, setUsersList] = useState(() => {
    const list = getStorage(STORAGE_KEYS.USERS_LIST, []);
    if (!list.length) {
      const initial = [
        {
          id: DEFAULT_USER.id,
          name: DEFAULT_USER.name,
          email: DEFAULT_USER.email,
          password: 'password123',
          phone: DEFAULT_USER.phone,
          bloodGroup: DEFAULT_USER.bloodGroup,
          emergencyNotes: DEFAULT_USER.emergencyNotes,
          address: DEFAULT_USER.address,
        },
      ];
      setStorage(STORAGE_KEYS.USERS_LIST, initial);
      return initial;
    }
    return list;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(getStorage(STORAGE_KEYS.USER, null));
  });

  // Login handler
  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = usersList.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!existing) {
      // Allow demo login with any credentials if matching demo, or if password matches
      return { success: false, message: 'No registered account found with this email address.' };
    }

    if (existing.password && existing.password !== password) {
      return { success: false, message: 'Incorrect password. (Demo password is: password123)' };
    }

    const sessionUser = {
      id: existing.id,
      name: existing.name,
      email: existing.email,
      phone: existing.phone || '+91 98765 43210',
      bloodGroup: existing.bloodGroup || 'B+',
      emergencyNotes: existing.emergencyNotes || '',
      address: existing.address || '',
      avatar: existing.avatar || DEFAULT_USER.avatar,
    };

    setUser(sessionUser);
    setIsAuthenticated(true);
    setStorage(STORAGE_KEYS.USER, sessionUser);
    return { success: true, user: sessionUser };
  };

  // Register handler
  const register = ({ name, email, password, phone, bloodGroup, emergencyNotes }) => {
    const trimmedEmail = email.trim().toLowerCase();
    const exists = usersList.some((u) => u.email.toLowerCase() === trimmedEmail);

    if (exists) {
      return { success: false, message: 'An account with this email is already registered.' };
    }

    const newUserRecord = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      phone: phone.trim(),
      bloodGroup: bloodGroup || 'O+',
      emergencyNotes: emergencyNotes || '',
      avatar: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [...usersList, newUserRecord];
    setUsersList(updatedList);
    setStorage(STORAGE_KEYS.USERS_LIST, updatedList);

    const sessionUser = {
      id: newUserRecord.id,
      name: newUserRecord.name,
      email: newUserRecord.email,
      phone: newUserRecord.phone,
      bloodGroup: newUserRecord.bloodGroup,
      emergencyNotes: newUserRecord.emergencyNotes,
      avatar: newUserRecord.avatar,
    };

    setUser(sessionUser);
    setIsAuthenticated(true);
    setStorage(STORAGE_KEYS.USER, sessionUser);

    return { success: true, user: sessionUser };
  };

  // Profile update handler
  const updateProfile = (updatedFields) => {
    if (!user) return false;
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    setStorage(STORAGE_KEYS.USER, updatedUser);

    // Also update in usersList
    const updatedList = usersList.map((u) => (u.id === user.id ? { ...u, ...updatedFields } : u));
    setUsersList(updatedList);
    setStorage(STORAGE_KEYS.USERS_LIST, updatedList);

    return true;
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeStorage(STORAGE_KEYS.USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
