import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Taller Mecánico. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
