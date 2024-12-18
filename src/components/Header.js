import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Header = ({ username, rol }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Taller Mecánico</h1>
      {username && (
        <div className="user-info">
          <span>{rol === 'mecanico' ? 'Mecánico' : 'Encargado'}: {username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
