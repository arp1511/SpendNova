import { useState } from 'react';
import Logo from './Logo.jsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

function AuthPanel({ profile, theme, onToggleTheme, onBackHome, onSignIn }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    remember: true,
    accepted: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  function updateField(event) {
    const { checked, name, type, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isSignUp && !form.name.trim()) {
      setError('Enter your name.');
      return;
    }

    if (!emailPattern.test(form.email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (!passwordPattern.test(form.password)) {
      setError('Use 8+ characters with uppercase, lowercase, number, and symbol.');
      return;
    }

    if (isSignUp && !form.accepted) {
      setError('Accept the terms and privacy policy to continue.');
      return;
    }

    onSignIn({ 
      name: isSignUp ? form.name.trim() : (profile?.name || 'User'), 
      email: form.email.trim(), 
      remember: form.remember 
    });
  }

  return (
    <main className="auth-shell">
      <nav className="auth-nav" aria-label="Login navigation">
        <button className="brand-button" type="button" onClick={onBackHome}>
          <Logo />
        </button>
        <button
          className="icon-nav-button"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'}
          title={theme === 'day' ? 'Switch to night mode' : 'Switch to day mode'}
        >
          {theme === 'day' ? '\u{1F319}' : '\u2600\uFE0F'}
        </button>
      </nav>
      <section className="auth-panel">
        <p className="eyebrow">Secure demo workspace</p>
        <h1>{isSignUp ? 'Create an account' : 'Welcome back'}</h1>
        <p className="hero-copy">
          {isSignUp 
            ? 'Sign up to create your local expense dashboard. Your data is stored securely in your browser.'
            : 'Sign in to open your saved expense dashboard. This demo keeps session and data locally.'}
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <label>
              <span>Name</span>
              <input name="name" value={form.name} onChange={updateField} placeholder="Your name" />
            </label>
          )}

          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="you@example.com"
            />
          </label>

          <label>
            <span>Password</span>
            <div className="password-field">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={updateField}
                placeholder="Use a strong password"
              />
              <button type="button" onClick={() => setShowPassword((current) => !current)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <label className="check-row">
            <input
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={updateField}
            />
            <span>Remember me for this browser</span>
          </label>

          {isSignUp && (
            <label className="check-row">
              <input
                name="accepted"
                type="checkbox"
                checked={form.accepted}
                onChange={updateField}
              />
              <span>I accept the terms and privacy policy</span>
            </label>
          )}

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-action" type="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button 
              type="button" 
              className="brand-button" 
              style={{ fontSize: '0.9rem', color: '#0f766e', fontWeight: 700 }}
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default AuthPanel;
