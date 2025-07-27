import React from 'react';
import { Link } from 'react-router-dom';
import eventCategories from '../data/eventCategories';

const heroSectionStyle = {
  position: 'relative',
  minHeight: '380px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5rem 1rem 3rem 1rem',
  textAlign: 'center',
  zIndex: 1,
};

const heroContentStyle = {
  position: 'relative',
  zIndex: 2,
  maxWidth: 700,
  margin: '0 auto',
  background: 'rgba(255,255,255,0.92)',
  borderRadius: '16px',
  boxShadow: '0 4px 32px rgba(44, 49, 66, 0.10)',
  padding: '2rem 1rem',
};

const h1Style = {
  fontSize: '2.8rem',
  color: '#2d3142',
  fontWeight: 800,
  marginBottom: '1rem',
  letterSpacing: '1px',
};

const animatedGradientTextStyle = {
  background: 'linear-gradient(90deg, #f9a826, #2d3142, #f9a826, #ffecd2)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 900,
  letterSpacing: '2px',
  display: 'inline-block',
  animation: 'gradientTextMove 3s linear infinite',
};

const heroPStyle = {
  fontSize: '1.25rem',
  color: '#444',
  marginBottom: '2rem',
  lineHeight: 1.6,
};

const heroActionsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const heroBtnStyle = {
  display: 'inline-block',
  padding: '0.85rem 2rem',
  borderRadius: '6px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
  boxShadow: '0 2px 8px rgba(249,168,38,0.08)',
  border: 'none',
  cursor: 'pointer',
};

const heroBtnPrimary = {
  ...heroBtnStyle,
  background: '#2d3142',
  color: '#fff',
};

const heroBtnSecondary = {
  ...heroBtnStyle,
  background: '#fff',
  color: '#2d3142',
  border: '2px solid #2d3142',
};

const ctaSectionStyle = {
  background: 'linear-gradient(90deg, #f9a826 0%, #ffecd2 100%)',
  padding: '3rem 1rem 3rem 1rem',
  textAlign: 'center',
  marginTop: '3rem',
};

const ctaContentStyle = {
  maxWidth: 600,
  margin: '0 auto',
  background: 'rgba(255,255,255,0.92)',
  borderRadius: '16px',
  boxShadow: '0 4px 32px rgba(44, 49, 66, 0.10)',
  padding: '2rem 1rem',
};

const ctaH2Style = {
  fontSize: '2.2rem',
  color: '#2d3142',
  fontWeight: 700,
  marginBottom: '1rem',
};

const ctaPStyle = {
  fontSize: '1.15rem',
  color: '#444',
  marginBottom: '2rem',
  lineHeight: 1.6,
};

// Keyframes for animation (inject into <style>)
const keyframes = `
@keyframes gradientTextMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

function Home() {
  // Inject keyframes only once
  React.useEffect(() => {
    if (!document.getElementById('home-hero-keyframes')) {
      const style = document.createElement('style');
      style.id = 'home-hero-keyframes';
      style.innerHTML = keyframes;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={h1Style}>
            Welcome to{' '}
            <span style={animatedGradientTextStyle}>
              Eventify
            </span>
          </h1>
          <p style={heroPStyle}>
            Your one-stop solution for all event management needs.<br />
            From weddings to corporate events, we make every moment memorable.
          </p>
          <div style={heroActionsStyle}>
            <Link to="/services" style={heroBtnPrimary}>
              Explore Services
            </Link>
            <Link to="/contact" style={heroBtnSecondary}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" id="categories">
        <h2>Event Categories</h2>
        <div className="categories-grid">
          {eventCategories.map((cat) => (
            <div className="category-card" key={cat.name}>
              <Link
                to={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="category-link"
              >
                <img src={cat.img} alt={cat.name} className="category-img" />
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={ctaSectionStyle}>
        <div style={ctaContentStyle}>
          <h2 style={ctaH2Style}>Ready to plan your next event?</h2>
          <p style={ctaPStyle}>
            Let our expert team handle the details while you enjoy the celebration.
            Get in touch for a free consultation and quote!
          </p>
          <Link to="/contact" style={heroBtnPrimary}>
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;