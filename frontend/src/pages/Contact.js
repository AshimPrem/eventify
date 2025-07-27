import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Have questions about our services? Need a custom quote? Reach out to us!</p>
          <div className="contact-details">
            <p><strong>Email:</strong> info@eventify.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
            <p><strong>Address:</strong> 123 Event Street, Party City, PC 12345</p>
          </div>
        </div>
        <div className="contact-form">
          {submitted ? (
            <div className="success-message">Thank you for your message! We'll get back to you soon.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} rows="5" required />
              <button type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;