import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, signup as apiSignup } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser]   = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setUser({});
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = async creds => {
    const { data } = await apiLogin(creds);
    const jwt = data.access_token;
    setToken(jwt);
    return data;
  };

  const signup = async creds => {
    const { data } = await apiSignup(creds);
    const jwt = data.access_token;
    setToken(jwt);
    return data;
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const getToken = () => localStorage.getItem('token');
