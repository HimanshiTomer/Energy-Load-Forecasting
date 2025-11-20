import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center' 
    }}>
      <FaExclamationTriangle size={60} color="#ced4da" />
      <h1 style={{ fontSize: '3rem', margin: '20px 0', color: '#346fad' }}>404</h1>
      <h2 style={{ marginTop: 0 }}>Page Not Found</h2>
      <p style={{ color: '#666', maxWidth: '400px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary" style={{ marginTop: '20px' }}>
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;