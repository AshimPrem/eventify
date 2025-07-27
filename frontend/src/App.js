import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import CategoryDetail from './pages/CategoryDetail';
import ServiceDetail from './pages/ServiceDetail';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { Navigate } from 'react-router-dom';
import './App.css';

function App() {
  useEffect(() => {
    // Inject keyframes only once
    if (!document.getElementById('global-hero-keyframes')) {
      const style = document.createElement('style');
      style.id = 'global-hero-keyframes';
      style.innerHTML = `
        @keyframes heroGradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
    // Set body background
    document.body.style.background = 'linear-gradient(120deg, #f9a826 0%, #ffecd2 50%, #2d3142 100%)';
    document.body.style.backgroundSize = '200% 200%';
    document.body.style.animation = 'heroGradientMove 8s ease-in-out infinite';
    document.body.style.minHeight = '100vh';
    document.body.style.transition = 'background 0.5s';
    return () => {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.animation = '';
      document.body.style.minHeight = '';
      document.body.style.transition = '';
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type === 'user'
              ? <Services />
              : <Navigate to="/login" replace />
          } />
          <Route path="/contact" element={
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type === 'user'
              ? <Contact />
              : <Navigate to="/login" replace />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category/:categoryId" element={
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type === 'user'
              ? <CategoryDetail />
              : <Navigate to="/login" replace />
          } />
          <Route path="/service/:serviceId" element={
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type === 'user'
              ? <ServiceDetail />
              : <Navigate to="/login" replace />
          } />
          <Route path="/admin" element={
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type === 'admin'
              ? <AdminDashboard />
              : <Navigate to="/login" replace />
          } />
          <Route path="/user-dashboard" element={
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).user_type === 'user'
              ? <UserDashboard />
              : <Navigate to="/login" replace />
          } />
        </Routes>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;