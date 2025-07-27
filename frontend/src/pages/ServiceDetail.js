import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../ServiceDetail.css'; // Make sure to import the CSS

function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/services/${serviceId}/`)
      .then(res => {
        if (!res.ok) throw new Error('Service not found');
        return res.json();
      })
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [serviceId]);

  if (loading) return <div className="loading">Loading service details...</div>;
  if (error || !service) return <div className="error-message">{error || 'Service not found'}</div>;

  return (
    <div className="service-detail-outer">
      <div className="service-detail-card">
        <div className="service-detail-header">
          <h2>{service.name}</h2>
          {service.image && (
            <img src={service.image} alt={service.name} className="service-detail-img" />
          )}
          <p className="service-price-tag">Starting at Rs.  <b>{service.price}</b></p>
        </div>
        <div className="service-detail-body">
          <div className="service-description">
            <h3>About This Service</h3>
            <p>{service.description}</p>
          </div>
          {service.features && service.features.length > 0 && (
            <div className="service-features">
              <h3>What's Included</h3>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="service-detail-actions">
          <button className="action-button primary" onClick={() => navigate('/contact')}>Request a Quote</button>
          <button className="action-button primary" onClick={() => navigate('/services')}>View All Services</button>
        </div>
        <button className="back-button" onClick={() => navigate('/user-dashboard')}>← Back to Services</button>
      </div>
    </div>
  );
}

export default ServiceDetail;