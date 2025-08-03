// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import "./styles.scss";

export default function ProtectedRoute() {
  const { token, logout } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="protected-layout">
        <button
          className="logout-btn"
          type="button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      <main className="pl-main">
        <Outlet />
      </main>
    </div>
  );
}
