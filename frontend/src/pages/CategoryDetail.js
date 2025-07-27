import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import eventCategories from '../data/eventCategories';

function CategoryDetail() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = eventCategories.find(
    cat => cat.name.toLowerCase().replace(/\s+/g, '-') === categoryId
  );

  if (!category) {
    return <div className="error-message">Category not found!</div>;
  }

  const features = [
    'Professional event planning',
    'Venue selection assistance',
    'Custom themes and decorations',
    'Catering options',
    'Photography and videography',
    'Entertainment booking',
    'Day-of coordination',
    'Budget management'
  ];

  return (
    <div className="category-detail-container">
      <div className="category-detail-header">
        <h2>{category.name} Events</h2>
        <img src={category.img} alt={category.name} className="category-detail-img" />
        <p className="category-detail-desc">{category.desc}</p>
      </div>
      <div className="category-detail-content">
        <div className="category-detail-features">
          <h3>What We Offer</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="category-detail-actions">
          <h3>Ready to Plan Your {category.name} Event?</h3>
          <div className="action-buttons">
            <button className="action-button primary" onClick={() => navigate('/contact')}>Get a Quote</button>
            <button className="action-button secondary" onClick={() => navigate('/services')}>View Services</button>
          </div>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>Back to Categories</button>
    </div>
  );
}

export default CategoryDetail;