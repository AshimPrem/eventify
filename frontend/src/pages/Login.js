import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const usernameRef = useRef(null);

  // Focus on username input when component mounts
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, user_type: userType })
      });
      const data = await res.json();

      // Debug: See what backend is sending
      console.log("Login response:", data);

      if (data.success) {
        localStorage.setItem(
          'user',
          JSON.stringify({ username: data.username, user_type: data.user_type })
        );

        // Redirect based on user_type (no manual refresh needed)
        if (data.user_type && data.user_type.toLowerCase() === 'admin') {
          window.location.replace('/admin');
        } else {
          window.location.replace('/user-dashboard');
        }
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Server error. Try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="form-container">
      <div className="user-type-toggle wide">
        <button
          type="button"
          className={`toggle-btn ${userType === 'user' ? 'active' : ''}`}
          onClick={() => setUserType('user')}
          tabIndex={0}
          aria-pressed={userType === 'user'}
        >
          I’m User
        </button>
        <button
          type="button"
          className={`toggle-btn ${userType === 'admin' ? 'active' : ''}`}
          onClick={() => setUserType('admin')}
          tabIndex={0}
          aria-pressed={userType === 'admin'}
        >
          I’m Admin
        </button>
      </div>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} autoComplete="on">
        <input
          ref={usernameRef}
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="spinner" aria-label="Logging in..."></span>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <p className="form-footer" style={{ marginTop: '1.5rem' }}>
        Don't have an account?{' '}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;