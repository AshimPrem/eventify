import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/services/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load services');
        return res.json();
      })
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading services...</div>;

  return (
    <section className="services-section">
      <h2>Our Services</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service.id}>
            <Link to={`/service/${service.id}`} className="service-link">
              {service.image && (
                <img src={service.image} alt={service.name} className="service-img" />
              )}
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <p className="service-price">{service.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;