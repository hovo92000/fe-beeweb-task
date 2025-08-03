import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from "../../assets/logo.svg"

import "./styles.scss";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await login({ email, password });
    navigate('/workspaces');
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logo" width={64} height={41} />
        <h2 className='login-title'>Login</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
         <div className='signup-link-btn-container'>
          <div className='signup-link-btn' onClick={() => navigate('/signup')}>Don’t have an account? Sign Up</div>
        </div>
        <button className='login-btn' type="submit">Log In</button>
      </form>
    </div>
  );
}