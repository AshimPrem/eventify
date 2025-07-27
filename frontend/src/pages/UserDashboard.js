import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../UserDashboard.css';

function UserDashboard() {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      window.location.href = '/login';
      return;
    }
    const parsed = JSON.parse(stored);
    if (parsed.user_type !== 'user') {
      window.location.href = parsed.user_type === 'admin' ? '/admin' : '/';
      return;
    }
    setUser(parsed);
    setChecking(false);
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/services/')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  if (checking) return <div className="loading">Loading your dashboard...</div>;

  return (
    <div className="user-dashboard">
      <aside className="user-sidebar">
        <ul>
          <li>
            <span style={{ color: '#f9a826', fontWeight: 600 }}>Services</span>
          </li>
        </ul>
      </aside>
      <main className="user-main">
        <h2>User Dashboard</h2>
        <p>Welcome, <b>{user.username}</b>!</p>
        <div className="services-section">
          <h3>Our Services</h3>
          <div className="services-grid">
            {services.map(service => (
              <Link
                to={`/service/${service.id}`}
                key={service.id}
                className="service-link"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="service-card">
                  {service.image && (
                    <img src={service.image} alt={service.name} className="service-img" />
                  )}
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                  <p className="service-price">{service.price}</p>
                  {service.features && service.features.length > 0 && (
                    <ul>
                      {service.features.map((f, idx) => <li key={idx}>{f}</li>)}
                    </ul>
                  )}
                  <button
                    className="action-button primary"
                    onClick={e => {
                      e.preventDefault();
                      window.location.href = '/contact';
                    }}
                  >
                    Request a Quote
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;