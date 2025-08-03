import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./styles.scss";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='not-found-wrapper'>
      <h2 className='not-found'>404</h2>
      <div className='not-found-text'>
        Oops—the page you're looking for doesn't exist.<br/>
        It might have been moved or deleted.
      </div>
      <button
        className='home-btn'
        type='button'
        onClick={() => navigate('/workspaces')}
      >
        Go home
      </button>
    </div>
  );
}