import React from 'react';

const Spinner = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <div className="spinner" />
    <style>{`
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #ccc;
        border-top-color: #3EB9FF;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
);

export default Spinner;