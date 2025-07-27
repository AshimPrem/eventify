import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Eventify</Link>
      </div>
      <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
        {user && user.user_type === 'admin' ? (
          <>
            <li>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            </li>
            <li className="user-greeting">Hello, {user.username}</li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : user && user.user_type === 'user' ? (
          <>
            <li>
              <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            </li>
            <li className="user-greeting">Hello, {user.username}</li>
            <li>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;