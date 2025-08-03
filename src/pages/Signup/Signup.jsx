import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from "../../assets/logo.svg"

import "./styles.scss";

export default function Signup() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { signup, login }       = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await signup({ email, password });

    const { access_token } = await login({ email, password });

    navigate('/workspaces');
  };

  return (
    <div className='signup-container'>
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="logo" width={64} height={41} />
        <h2 className='signup-title'>Sign Up</h2>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className='login-link-btn-container'>
          <div className='login-link-btn' onClick={() => navigate('/login')}>Already have an account? Log In</div>
        </div>
        <button className='create-account-btn' type="submit">Create Account</button>
      </form>
    </div>
  );
}
