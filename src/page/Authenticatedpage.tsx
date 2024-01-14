// AuthenticatedPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function AuthenticatedPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const authenticated = localStorage.getItem('Authenticated');
    if(!authenticated) {
      navigate('/login');
    }
  },[])
  const handleLogout = () => {
    // Perform logout actions (e.g., clear local storage, reset authentication state)
    localStorage.removeItem('Authenticated');
    
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Authenticated Page</h1>
      <p>This is a protected page with authenticated content.</p>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}
